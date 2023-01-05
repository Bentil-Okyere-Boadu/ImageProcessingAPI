import supertest from "supertest";
import app from '../index';
import path from "path"
import { searchFile } from "../src/services/fileService"
import transformImage from "../src/services/transformImage";

const request = supertest(app)
const inputDir = path.join(__dirname, '../images')
const outputDir = path.join(__dirname, '../src/assets/thumbs')

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
            await expectAsync(transformImage('palmtunnel', 450, 600)).toBeResolved()
        })

        it('Checks if image transform was not successful ', async() => {
           await expectAsync(transformImage('palmtunnel4434', 450, 600)).toBeRejected()
        })
    })

    describe('Checks if image exists in thumbs folder', () => {
        it('Returns true if image already exists in assets/thumbs folder', () =>{
            expect(searchFile('icelandwaterfall300x250', outputDir)).toBe(true)
        })

        it('Returns false if image does not exist in assets/thumbs folder', () =>{
            expect(searchFile('icelandwaterfall400x350', outputDir)).toBe(false)
        })
    })

    describe('File service tests', () => {
        it('it checks if the file can be found in images folder', () => {
            expect(searchFile('fjord', inputDir)).toBe(true)
        });

        it('it checks if the file is not found in images folder', () => {
            expect(searchFile('ford', inputDir)).toBe(false)
        });
    });
});




