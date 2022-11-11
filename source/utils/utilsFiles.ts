import * as path from 'path';
import { v4 as uuid } from 'uuid';
import { diskStorage } from 'multer';
import * as fs from 'fs';
import * as sharp from 'sharp';
import { HttpService } from '@nestjs/axios';

const staticFiles = path.join('public', 'upload');

export const imageFileFilter = (req, file, callback) => {
	if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
		return callback(new Error('Only image files are allowed!'), false);
	}
	return callback(null, true);
};

export const editFileName = async (
	prefix: string,
	file: Express.Multer.File,
	verificarSiexisteDB: (filename: string) => any,
	convertToJpg?: boolean
) => {
	const name = file.originalname.split('.')[0];
	const fileExtName = convertToJpg ? '.jpg' : '.png';
	const randomName = uuid();
	const filename = `${prefix}${name}-${randomName}${fileExtName}`;
	const validar = await verificarSiexisteDB(filename);
	if (validar) {
		editFileName(prefix, file, verificarSiexisteDB);
	} else return filename;
};

export const storageImage = () => {
	return diskStorage({
		destination: './public/upload',
		filename: (req, file, cb) => cb(null, file.originalname),
	});
};

export const moveFile = async function (oldPath: string, newPath: string, convertToJpg?: boolean) {
	newPath = path.join(staticFiles, newPath);
	let query = sharp(path.join(staticFiles, oldPath)).resize(600);
	if (convertToJpg) {
		query = query.flatten({ background: '#fff' }).toFormat('jpg').jpeg({ quality: 80 });
	} else {
		query = query.toFormat('png').png({ quality: 80 });
	}
	await query.toFile(newPath);

	deleteFile(oldPath);
};

export const deleteFile = (pathDelete: string) => {
	pathDelete = path.join(staticFiles, pathDelete);
	if (fs.existsSync(pathDelete)) fs.unlink(pathDelete, () => {});
};

export const downLoadImage = async (values: {
	httpService: HttpService;
	url: string;
	nameImage: string;
	prefix: string;
}) => {
	const { httpService, url, nameImage, prefix } = values;
	const rutaImage = path.join('public', 'upload', prefix, nameImage);
	const writer = fs.createWriteStream(rutaImage);

	const response = await httpService.axiosRef({
		url,
		method: 'GET',
		responseType: 'stream',
	});

	response.data.pipe(writer);

	return Boolean(
		new Promise((resolve, reject) => {
			writer.on('finish', resolve);
			writer.on('error', reject);
		})
	);
};
