const yargs=require('yargs');
const getPatient = require('./main');

yargs.command({
    command:'admit',
    description:'admit a new patient',
    builder:{
             id:{description:'shows the ID of the patient',demandOption:true,type:'string'},
             name:{description:'shows the name of the patient',demandOption:true,type:'string'},
             age:{description:'shows the age of the patient',demandOption:true,type:'number'},
             phone:{description:'shows the phone number of the patient family',demandOption:true,type:'number'},
             blood:{description:'shows the blood group of the patient',demandOption:true,type:'string'},
             history:{description:'shows the medical history of the patient',demandOption:true,type:'string'},
             allergies:{description:'shows the allergies of the patient',demandOption:true,type:'string'},
             insurance:{description:'shows the health insurance of the patient',demandOption:true,type:'string'},
             description:{description:'shows the description of the patient',demandOption:true,type:'string'},
             type:{description:'shows the admission type of the patient',demandOption:true,type:'string'},
             condition:{description:'shows the present condition of the patient',demandOption:true,type:'string'}},
    handler:function(argv){
        getPatient.addPatient(argv.id,argv.name,argv.age,argv.phone,argv.blood,argv.history,argv.allergies,argv.insurance,argv.
            description,argv.type,argv.condition);
    }
})

yargs.command({
    command:'discharge',
    description:'discharge a patient',
    builder:{
             id:{description:'shows the ID of the patient',type:'string'}},
    handler:function(argv){
        getPatient.removePatient(argv.id);
    }
})

yargs.command({
    command:'getDetails',
    description:'Get details of a patient',
    builder:{
             id:{description:'shows the ID of the patient',type:'string'}},
    handler:function(argv){
        getPatient.getDetails(argv.id);
    }
})

yargs.command({
    command:'shifttoICU',
    description:'shift patient to ICU',
    handler:function(){
        getPatient.shifttoICU();
    }
})

yargs.command({
    command:'prepareOT',
    description:'prepares Operation Theatre for the patient',
    handler:function(){
        getPatient.prepareOT();
    }
})

yargs.command({
    command:'testsRequired',
    description:'shows the tests required for the patient',
    handler:function(){
        getPatient.testsRequired();
    }
})

yargs.command({
    command:'treatment',
    description:'shows the treatment prescribed for the patient',
    handler:function(){
        getPatient.treatment();
    }
})

yargs.command({
    command:'isAvailable',
    description:'shows the treatment prescribed for the patient',
    builder:{
        room:{description:'room no of the patient',type:'string'}
    },
    handler:function(argv){
        getPatient.isAvailable(argv.room);
    }
})

console.log(yargs.argv);