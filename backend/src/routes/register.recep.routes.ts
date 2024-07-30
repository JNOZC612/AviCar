import { Request, Response, Router } from 'express';
import { getUserModel } from '../models/user.models';
import { connectDB } from '../services/database.services';
import multer from 'multer';
import { S3Client } from '@aws-sdk/client-s3';
import path from 'path';
import { Upload } from '@aws-sdk/lib-storage';

const router = Router();
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
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
    }
});
router.post('/register-recep', upload.single('image'), async (req: Request, res: Response) => {
    const { name, user, mail, pass } = req.body;
    const image = req.file;
    if (!name || !user || !mail || !pass || !image) {
        return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }
    try {
        const connection = await connectDB('users_db', process.env.MONGO_URI_USER || '');
        const User = getUserModel(connection); // Obtener el modelo de usuario
        const chekRecep = await User.findOne({ user: user, mail: mail });
        if (chekRecep) {
            res.status(204).json({ error: "Datos ya utilizados" });
        } else {
            const fileExt = path.extname(image.originalname);
            const newFileName = `${user}${fileExt}`;
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
                typu: 'recep',
                image: urlImage
            });
            await newUser.save();
            res.json({ message: 'Usuario guardado exitosamente', newUser });
        }
    } catch (error) {
        console.error('Error al registrar usuario: ', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

export default router;