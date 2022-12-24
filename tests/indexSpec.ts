import supertest from "supertest";
import app from '../index';
import path from "path"
import { searchFile } from "../src/services/fileService"
import transformImage from "../src/services/transformImage";

const request = supertest(app)
const inputDir = path.join(__dirname, '../images')

describe('Image API tests', () => {
    describe('Test endpoint responses', () => {
        it('gets the /api endpoint', async () => {
            const response = await request.get('/api')
            expect(response.status).toBe(200);
        });

        it('gets the /image endpoint', async () => {
            const response = await request.get('/image?filename=icelandwaterfall&width=250&height=300')
            expect(response.status).toBe(200);
        });
    });

    describe('Tests image processing', () => {
        it('Checks if image successfully transformed', async() => {
            expect(await transformImage('palmtunnel', 450, 600)).not.toThrow()
        })

        it('Checks if image transform was not successful ', async() => {
            expect(await transformImage('palmtunnel4434', 450, 600)).toThrow('Error: Input file is missing')
        })
    })

    describe('File service tests', () => {
        it('it checks if the file can be found in assets/images folder', () => {
            expect(searchFile('fjord', inputDir)).toBe(true)
        });

        it('it checks if the file is not found in assets/images folder', () => {
            expect(searchFile('ford', inputDir)).toBe(false)
        });
    });
});




