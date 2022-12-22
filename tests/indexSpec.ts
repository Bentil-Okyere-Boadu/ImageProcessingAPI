import supertest from "supertest";
import app from '../index';
import path from "path"
import { searchFile } from "../src/services/fileService"

const request = supertest(app)
const inputDir = path.join(__dirname, '../../src/assets/images')
const outputDir = path.join(__dirname, '../../src/thumbs')

describe('Image API tests', () => {
    describe('Test endpoint responses', () => {
        it('gets the /api endpoint', async () => {
            const response = await request.get('/api')
            expect(response.status).toBe(200);
        });

        // it('gets the /image endpoint', async () => {
        //     const response = await request.get('/image?filename=icelandwaterfall&width=250&height=300')
        //     expect(response.status).toBe(200);
        // });
    });

    describe('File service tests', () => {
        it('it checks if the file can be found in assets/images folder', () => {
            expect(searchFile('fjord', inputDir)).toBe(true)
        });

        it('it checks if the file is not found in assets/images folder', () => {
            expect(searchFile('ford', inputDir)).toBe(false)
        });

        it('it checks if the file can be found in /thumbs folder', () => {
            expect(searchFile('fjord200x200', outputDir)).toBe(true)
        });

        it('it checks if the file is not found in /thumbs folder', () => {
            expect(searchFile('fjord20', outputDir)).toBe(false)
        });
    });
});




