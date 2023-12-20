const fs = require('fs')
const chalk=require('chalk')
const _=require('lodash')
const rooms = ['A1', 'A2', 'A3', 'B1', 'B2', 'B3', 'C1', 'C2', 'C3', 'D1', 'D2', 'D3', 'E1', 'E2', 'E3', 'F1', 'F2', 'F3'];

 const addPatient = function (id,name,age,phone,blood,history,allergies,insurance,description,type,condition){
    const patients = loadPatient()
    const duplicatePatients = patients.filter(function(patient){
    return patient.id === id
    })
    if (duplicatePatients.length === 0){
      patients.push({
      RoomNo:rooms[id],
      id:id,
      name:name,
      age:age,
      phone:phone,
      blood:blood,
      history:history,
      allergies:allergies,
      insurance:insurance,
      description:description,
      type:type,
      condition:condition
    })
    savePatient(patients)
    console.log(chalk.green.inverse('New Patient admitted!'))
    }else{
    console.log(chalk.red.inverse('Id Already taken'))
    }
 }

const removePatient=function(id){
    const patients=loadPatient()
    const patientsToKeep=patients.filter(function(patient){
        return patient.id!==id
    })
    if (patients.length>patientsToKeep.length){
        console.log(chalk.green.inverse('Patient Discharged'))
        savePatient(patientsToKeep)
    }else{
        console.log(chalk.red.inverse('Patient Not Found'))
    }
}

const getDetails=(id)=>{
    const patients=loadPatient()
    const patient=patients.find((patient)=>patient.id===id)
    if(patient){
        console.log(chalk.inverse("Details of",patient.id))
        console.log(patient)
    }else{
        console.log(chalk.red.inverse('Patient Not Found'))
    }
}

const shifttoICU=function(){
     const patients=loadPatient()
     console.log(chalk.black.bgYellow('Shift following patients to ICU:'))
     patients.forEach((patient)=>{
        if(patient.condition=="critical"){
            console.log(chalk.magenta.bgWhite("Id:",patient.id,"Name:",patient.name) )
        }
     })
}

const prepareOT=function(){
  const patients=loadPatient()
  console.log(chalk.blue('Prepare Operation Theatre for the following patients,according to Urgency:'))
  patients.forEach((patient)=>{
    if(_.includes(patient.description,'surgery')){
        console.log(chalk.yellow("Id:",patient.id,"Name:",patient.name))
    }
  })
}

const testsRequired=function(){
    const patients=loadPatient()
    patients.forEach((patient)=>{
        if(_.includes(patient.description,'bleeding')){
            console.log(chalk.blue('For Patient Id:',patient.id))
            console.log(chalk.cyan('CBC,clotting test,ABG,ECG,Imaging tests are required'))
        }else if(_.includes(patient.description,'COVID')){
            console.log(chalk.blue('For Patient Id:',patient.id))
            console.log(chalk.cyan('PCR,antigen,antibody tests are required'))
        }else if(_.includes(patient.description,'diabetes')){
            console.log(chalk.blue('For Patient Id:',patient.id))
            console.log(chalk.cyan('blood glusose test,haemoglobin A1c test,oral glucose tolerance tests are required'))
        }
    })
}

const treatment=function(){
    const patients=loadPatient()
    console.log('First Step:')
    patients.forEach((patient)=>{
       if(_.includes(patient.description,'bleeding')){
        console.log(chalk.blue('For Patient Id:',patient.id))
        console.log('Arrange',patient.blood,'as soon as possible')
      }else if(_.includes(patient.description,'heart')){
        console.log(chalk.blue('For Patient Id:',patient.id))
        console.log('consult a cardiologist')
      }else if(_.includes(patient.description,'pregnant')){
        console.log(chalk.blue('For Patient Id:',patient.id))
        console.log('get yourself a gynaecologist')
      }
    })
}

const isAvailable = (room) => {
    const patients = loadPatient()
    const patient = patients.filter((patient) => patient.RoomNo === room)
          if(patient!=0){
           console.log("Room is already assigned");
          }else{
            if(rooms.includes(room)){
            console.log("Room is Available")
            }else{
                console.log("Room doesn't exist")
            }
        }
}

const savePatient = function (patients) {
    const dataJSON = JSON.stringify(patients)
    fs.writeFileSync('patients.json',dataJSON)
}
    
const loadPatient = function () {
    try{
    const dataBuffer = fs.readFileSync('patients.json')
    const dataJSON = dataBuffer.toString()
    return JSON.parse(dataJSON)
    }catch (e){
    return []
    }
}

module.exports={
    addPatient:addPatient,
    removePatient:removePatient,
    getDetails:getDetails,
    shifttoICU:shifttoICU,
    prepareOT:prepareOT,
    testsRequired:testsRequired,
    treatment:treatment,
    isAvailable:isAvailable
}