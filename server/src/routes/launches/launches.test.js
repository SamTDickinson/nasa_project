import request from 'supertest';
import {app} from '../../app.mjs';

describe('Test GET /launches', () => {
    test('It should respond with 200 success', async () => {
        const response = await request(app)
            .get('/launches')
            .expect('Content-Type', /json/)
            .expect(200);
        // expect(response.status).toBe(200);
    });
});


describe('Test POST/launches', () => {

    const completeLaunchData = {
        mission: 'USS Enterprise',
        rocket: 'NCC-1701-D',
        target: 'Earth',
        launchDate: 'January 4, 2028'
    }

    const launchDataWithoutDate = {
        mission: 'USS Enterprise',
        rocket: 'NCC-1701-D',
        target: 'Earth'
    }

    const launchDataWithInvalidDate = {
        mission: 'USS Enterprise',
        rocket: 'NCC-1701-D',
        target: 'Earth',
        launchDate: 'zoot'
    }

    test('It should respond with 201 success', async () => {
        const response = await request(app)
            .post('/launches')
            .send(completeLaunchData)
            .expect('Content-Type', /json/)
            .expect(201);


        const requestDate = new Date(completeLaunchData.launchDate).valueOf();
        const responseDate = new Date(response.body.launchDate).valueOf();

        expect(responseDate).toBe(requestDate);
        expect(response.body).toMatchObject(
            launchDataWithoutDate
        )
    });

    test('It should catch missing required properties', async () => {
        const response = await request(app)
            .post('/launches')
            .send(launchDataWithoutDate)
            .expect('Content-Type', /json/)
            .expect(400);

        expect(response.body).toStrictEqual({"error": "Missing required launch property."});
    });

    test('It should catch Invalid dates', async () => {
        const response = await request(app)
            .post('/launches')
            .send(launchDataWithInvalidDate)
            .expect('Content-Type', /json/)
            .expect(400);

        expect(response.body).toStrictEqual({"error": "Invalid launch date."});
    });
});
