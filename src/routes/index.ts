import express from 'express';

const {Router, request, response }= express

const router = Router();
router.get('/', (req, res ) => { 
    res.send('Hello World!')
});

export {router}