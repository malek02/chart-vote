const express=require('express');
const router=express.Router();
const Pusher = require('pusher');
const mongoose= require('mongoose');
const Vote=require('../modules/Votes')

const pusher = new Pusher({
    appId: '1079533',
    key: '6306b08bda5cf3c2eb33',
    secret: '0da26e7abc6898bddc58',
    cluster: 'eu',
    encrypted: true
  });
  router.get('/', async (req, res)=>{
    try{
        const profiles =await Vote.find()
        res.json(profiles)
    }catch(err){
        console.error(err.message);
        res.status(500).send('server error')
    }
});
router.post('/',(req,res)=>{
    const nexVote={
        points:1,
        car:req.body.car
    }
    new Vote(nexVote).save().then(vote=>{
        pusher.trigger('Cars-poll', 'Cars-vote', {
            points:parseInt(vote.points),
            car:vote.car
    
          }) 
    })
  return  res.json({success:true,message:'thanks for your vote'});
})











module.exports=router