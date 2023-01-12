const express = require ('express');
const matlab = require("../matlab");
const Router = express.Router();

Router.post('/antialiasing', async (req,res) => {
    try {
        const ts = Date.now()
        const resultImage = `results/image-antialiasing-${ts}.png`
        const result = await matlab.run(`
        I = imread('results/${req.body.image}');
        AI = imresize(I, 0.7, 'Antialiasing', true);
        imwrite(AI,'results/image-antialiasing-${ts}.png');
        disp('result=success')`)
        res.status(200).send({success: (result === 'success'), message: resultImage})
    } catch (error) {
        res.status(500).send({success:false, error: error})
    }
})

Router.post('/rotate', async (req,res) => {
    try {
        const ts = Date.now()
        const resultImage = `results/image-rotated-${ts}.png`
        const result = await matlab.run(`
        clc;
        clear;
        x=imread('results/${req.body.image}');
        x=imresize(x,[200 200]);
        x3=double(x);
        for i=1:400
        for j=1:400
        x1(i,j)=round((i-100).*cosd(${req.body.degrees})+(j-100).*sind(${req.body.degrees})+100);
        x2(i,j)=round(-(i-100).*sind(${req.body.degrees})+(j-100).*cosd(${req.body.degrees})+100);
        if(x1(i,j)<=200)&&(x1(i,j)>0)&&(x2(i,j)<=200)&&(x2(i,j)>0)
              a(i,j,:)=x3(x1(i,j),x2(i,j),:);
          end;
          end;
          end;
          imwrite(uint8(a),'results/image-rotated-${ts}.png');
        disp('result=success')`)
        res.status(200).send({success: (result === 'success'), message: resultImage})
    } catch (error) {
        res.status(500).send({success:false, error: error})
    }
})

Router.post('/togray', async (req,res) => {
    try {
        const ts = Date.now()
        const resultImage = `results/image-black-white-${ts}.png`
        const result = await matlab.run(`
        clear; clc;
        I = imread('results/${req.body.image}');
        R = im2gray(I);
        imwrite(R,'results/image-black-white-${ts}.png');
        disp('result=success')`)
        res.status(200).send({success: (result === 'success'), message: resultImage})
    } catch (error) {
        res.status(500).send({success:false, error: error})
    }
})

Router.post('/interpolatereduce', async (req,res) => {
    try {
        const ts = Date.now()
        const resultImage = `results/image-reduced-${ts}.png`
        const result = await matlab.run(`
        clear; clc;
        I = imread('results/${req.body.image}');
        sz = size(I);
        xg = 1:sz(1);
        yg = 1:sz(2);
        F = griddedInterpolant({xg,yg},double(I));
        xq = (0:1.55:sz(1))';
        yq = (0:1.55:sz(2))';
        vmin = uint8(F({xq,yq}));
        imwrite(vmin,'results/image-reduced-${ts}.png');
        disp('result=success')`)
        res.status(200).send({success: (result === 'success'), message: resultImage})
    } catch (error) {
        res.status(500).send({success:false, error: error})
    }
})

Router.post('/interpolateextend', async (req,res) => {
    try {
        const ts = Date.now()
        const resultImage = `results/image-extended-${ts}.png`
        const result = await matlab.run(`
        clear; clc;
        I = imread('results/${req.body.image}');
        sz = size(I);
        xg = 1:sz(1);
        yg = 1:sz(2);
        F = griddedInterpolant({xg,yg},double(I));
        xq = (0:5/6:sz(1))';
        yq = (0:5/6:sz(2))';
        vmax = uint8(F({xq,yq}));
        imwrite(vmax,'results/image-extended-${ts}.png');
        disp('result=success')`)
        res.status(200).send({success: (result === 'success'), message: resultImage})
    } catch (error) {
        res.status(500).send({success:false, error: error})
    }
})

Router.post('/invert', async (req,res) => {
    try {
        const ts = Date.now()
        const resultImage = `results/image-inverted-${ts}.png`
        const result = await matlab.run(`
        clear; clc;
        I = imread('results/${req.body.image}');
        IC = 255-I;
        imwrite(IC,'results/image-inverted-${ts}.png');
        disp('result=success')`)
        res.status(200).send({success: (result === 'success'), message: resultImage})
    } catch (error) {
        res.status(500).send({success:false, error: error})
    }
})

module.exports = Router