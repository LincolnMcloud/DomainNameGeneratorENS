
const main = async() => {
  const [owner, randomPerson] = await hre.ethers.getSigners() // retreives accounts from the list of accounts in hardhat
  const domainContractFactory = await hre.ethers.getContractFactory('Domains'); // getting the data from the domain contract
  const domainContract = await domainContractFactory.deploy("Mclouds") // deploying the contract
  await domainContract.deployed() // waits for the contract to be deployed

  console.log("The contracts address: " + domainContract.address)
  console.log("This is the owner's address: "+ owner.address)

  const txn = await domainContract.register("mortal", {value: hre.ethers.utils.parseEther("0.5")})
  await txn.wait()

  const domainOwner = await domainContract.getAddress("mortal")
  console.log("Owner of doom domain is: " + domainOwner)

  // const txn2 = await domainContract.setRecord("doom", "This is kind of cool")
  // await txn2.wait()

  // const recordInfo = await domainContract.getRecord("doom")
  // console.log("The data in the record is: "+ recordInfo)

  const balance = await hre.ethers.provider.getBalance(domainContract.address)
  console.log("Contract balance: "+ hre.ethers.utils.formatEther(balance))

}

const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };
  
  runMain();