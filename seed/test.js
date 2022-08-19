const db = require('../config/database')
const User = require('../modeles/User')
/*let newEvent = new User({
    first_name : 'admin',
    last_name:'admin',
    email:'admin@admin.com',
    password : "admin",
    role : "1"

})

newEvent.save((err)=>{
    if(err){
        console.log(err) 
    }
    else{
        console.log('event added secssesfuly ..')
    }
})*/

let newfeilds = {
    role : "1"
}
let query = {_id :"62fec8500d6128c582bfee48"}
User.updateOne(query,newfeilds,(err)=>{
    if(!err){
        console.log('ok')
    }
    else{
        console.log(err)
    }
})

/*let newEvents = [
    new Event({
        title : 'this is event 1',
        description:' this is the best event in world',
        location:'oman',
        date : Date.now(),
        created_att: Date.now()
    }),
    new Event({
        title : 'this is event 2',
        description:' this is the best event in world',
        location:'maroc',
        date : Date.now(),
        created_att: Date.now()
    }),
    new Event({
        title : 'this is event 3',
        description:' this is the best event in world',
        location:'fes',
        date : Date.now(),
        created_att: Date.now()
    }),
    new Event({
        title : 'this is event 4',
        description:' this is the best event in world',
        location:'markkech',
        date : Date.now(),
        created_att: Date.now()
    }),
    new Event({
        title : 'this is event 5',
        description:' this is the best event in world',
        location:'tindet',
        date : Date.now(),
        created_att: Date.now()
    }),
    new Event({
        title : 'this is event 6',
        description:' this is the best event in world',
        location:'casa blanca',
        date : Date.now(),
        created_att: Date.now()
    }),
    new Event({
        title : 'this is event 7',
        description:' this is the best event in world',
        location:'Rabat',
        date : Date.now(),
        created_att: Date.now()
    }),
    new Event({
        title : 'this is event 8',
        description:' this is the best event in world',
        location:'tanger',
        date : Date.now(),
        created_att: Date.now()
    }),
    new Event({
        title : 'this is event 9',
        description:' this is the best event in world',
        location:'nador',
        date : Date.now(),
        created_att: Date.now()
    })
]
newEvents.forEach((event)=>{
    event.save((err)=>{
        if(err){
            console.log(err)
        }
    })
})*/
