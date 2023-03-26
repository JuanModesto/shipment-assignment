import readLine from "readline/promises";
import { readFile } from "fs/promises";
import Munkres from "munkres-js";
import commonFactors from 'compute-gcd'

const readline = readLine.createInterface({
  input: process.stdin,
  output: process.stdout,
});

/*
  * shipments: Array with every shipment adress name.
  * drivers: Array with every driver's name.
*/
let [shipments, drivers] = [[], []]

askForFilenames()

async function askForFilenames() {
  let shipmentsFileName = await readline.question("Enter Shipments filename:");
  let driversFileName = await readline.question("Enter Drivers filename:");
  
  try {
    shipments = (await readFile("./" + shipmentsFileName, "utf-8")).split(/\r\n/)
    drivers = (await readFile("./" + driversFileName, "utf-8")).split(/\r\n/)
  } catch(error){
    console.log(error)
    return false;
  }
  
  calculateScores()
}

function calculateScores(){
  /**
   * scores: 2D Matrix (Shipments and Drivers), that will contain the calculated Suitable Score(SS) of every driver for each shipment adress.
   */
  let scores = []

  //Loop through shipments and drivers arrays to calculate the individual driver score for each shipment adress and then save it at the scores matrix.
  for (let i = 0; i < shipments.length; i++) {
    let shipmentName = shipments[i]
    let shipmentNameLength = shipmentName.length;
    //shipmentsScores stores all drivers scores for the current shipment.
    let shipmentScores = []

    for (let j = 0; j < drivers.length; j++) { 
      let vowels, consonants, driverScore = 0
      let driverNameLength = drivers[j].length;

      //Check if shipmentNameLength is Even/Odd and calculate suitable score for each case
      if(shipmentNameLength % 2 == 0){
        vowels = drivers[j].toLowerCase().match(/[aeiou]/gi).length
        driverScore = vowels*1.5
      } else{
        consonants = drivers[j].toLowerCase().match(/[bcdfghjklmnpqrstvwxyz]/gi).length;
        driverScore = consonants*1
      }
      
      //When shipment's and driver's names have any common factor besides 1, driverScore increases a 50%.
      if(commonFactors(shipmentNameLength,driverNameLength)!=1){
        driverScore = driverScore*1.5
      }

      shipmentScores.push(driverScore)
    }

    scores.push(shipmentScores) //Add the drivers scores for the shipment, to the scores matrix.
  }

  runMunkresAlgorithm(scores)
}

function runMunkresAlgorithm(scores){
  let costMatrix = Munkres.make_cost_matrix(scores) //Transforms the scores matrix from being a BENEFITS matrix to a COST matrix.
  let result = Munkres(costMatrix) //Returns the list of costMatrix indices corresponding to the Optimal Assignment [[shipmentIndex][bestDriverIndex], ...[n][n]].
  showResult(scores, result)
}

function showResult(scores, result){
  let optimalAssignment = []
  let totalSS = 0;
  //Loop through the result matrix that has the optimal assigment indices [[shipmentIndex][bestDriverIndex], ...[n][n]], to get the corresponding shipments and drivers names.
  for(let x of result){
    let shipmentName = shipments[x[0]]
    let driverName = drivers[x[1]]
    optimalAssignment[shipmentName]=driverName
    totalSS += scores[x[0]][x[1]]
  }
  console.log("TOTAL SS:"+totalSS)
  console.log("OPTIMAL ASSIGNMENT:")
  console.table(optimalAssignment)
}