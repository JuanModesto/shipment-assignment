# shipment-assignment
This is a NodeJS application to find out the most optimal assignment of drivers to a list of shipping destinations, choosing a single driver for each shipping address based on their scores and ensuring that no driver is assigned more than once.

## Introduction

This command-line program allows the user to obtain the most optimal assignment of a list of shipments destinations to a list of drivers, without repeating none of them, based on suitable scores for every driver that are calculated applying three rules, for determining which driver is best suited to deliver each shipment:

1. If the length of the shipment's destination street name is even, the base suitability score (SS) is the number of vowels in the driver’s name multiplied by 1.5.
2. If the length of the shipment's destination street name is odd, the base SS is the number of consonants in the driver’s name multiplied by 1.
3. If the length of the shipment's destination street name shares any common factors (besides 1) with the length of the driver’s name, the SS is increased by 50% above the base SS.

All of this in a way that the assignment maximizes the total suitable score (SS) over the set of drivers.


## Installation and Usage

Clone the project

```bash
  git clone https://github.com/JuanModesto/shipment-assignment.git
```

Go to the project directory

```bash
  cd shipment-assignment
```

You'll need to have [NodeJS](https://nodejs.org/en) installed at your machine and run the "npm install" command in order to generate the node_modules folder.

```bash
  npm install
```

In the root directory of this project, you'll find two newline-separated files (shipments.txt and drivers.txt), where you could write your list of shipments addreses and drivers names (separated by newline) respectively, or create new ones with any other filenames.


Run the application

```bash
  npm run prod
```

Application will ask you to type the filenames of your shipments and drivers list by command-line.
```bash
  Enter Shipments filename:shipments.txt
```

```bash
  Enter Drivers filename:drivers.txt
```

From here, application will read the content from the specified files, and make all the proccess to give you an output containing:
- Total Suitable Score of the Most Optimal assignment.
- Matching between shipment destinations and drivers of the Most Optimal assignment.

## Implemented Open source libraries
Library for the calculation of common factors between two numbers: [compute-gcd](https://www.npmjs.com/package/compute-gcd)

Library for the implementation of the "Hungarian algorithm" or "Munkres algorithm" [munkres-js](https://www.npmjs.com/package/munkres-js)
