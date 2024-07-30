import { Request, Response, Router } from 'express';
import { getUserModel } from '../models/user.models';
import { connectDB } from '../services/database.services';
import multer from 'multer';
import { S3Client } from '@aws-sdk/client-s3';
import path from 'path';
import { Upload } from '@aws-sdk/lib-storage';

const router = Router();

// Configuración de multer para almacenar archivos en memoria
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        // Validar que el archivo sea una imagen
        if (!file.mimetype.startsWith('image/')) {
            return cb(new Error('Solo se permiten archivos de imagen.'));
        }
        cb(null, true);
    }
});
const s3Client = new S3Client({
    region: 'us-east-2',
    credentials: {
        accessKeyId: process.env.ACESSKEYID_S3,
        secretAccessKey: process.env.SECRETACESSKEY_S3
    },
});
router.post('/register', upload.single('image'), async (req: Request, res: Response) => {
    const { name, user, mail, pass } = req.body;
    const image = req.file;
    if (!name || !user || !mail || !pass || !image) {
        return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }
    try {
        const connection = await connectDB('users_db', process.env.MONGO_URI_USER || '');
        const User = getUserModel(connection); // Obtener el modelo de usuario
        const checkUser = await User.findOne({ mail: mail, user: user });

        if (checkUser) {
            return res.status(204).json({ error: "Ya existe este usuario" });
        } else {
            const fileExt = path.extname(image.originalname);
            const newFileName = `${user}${fileExt}`;
            //const imageBuffer = image.buffer;
            const uploadParams = {
                Bucket: 'nzbp1',
                Key: newFileName,
                Body: image.buffer,
                ContentType: image.mimetype
            };
            const parallelUploads3 = new Upload({
                client: s3Client,
                params: uploadParams,
                tags: [],
                queueSize: 4,
                partSize: 5 * 1024 * 1024,
                leavePartsOnError: false,
            });
            parallelUploads3.on('httpUploadProgress', (progress) => {
                console.log(progress);
            });
            await parallelUploads3.done();
            const urlImage = `https://nzbp1.s3.us-east-2.amazonaws.com/${newFileName}`;
            const newUser = new User({
                name,
                user,
                mail,
                pass,
                typu: 'turist',
                image: urlImage
                // No guardar la imagen en la base de datos
            });
            await newUser.save();
            return res.json({ message: 'Usuario guardado exitosamente' });
        }
    } catch (error) {
        console.error('Error al registrar usuario: ', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
});

export default router;