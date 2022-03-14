const main = async () => {
    const domainContractFactory = await hre.ethers.getContractFactory('Domains');
    const domainContract = await domainContractFactory.deploy("ljtron");
    await domainContract.deployed();
  
    console.log("Contract deployed to:", domainContract.address);
  
    // CHANGE THIS DOMAIN TO SOMETHING ELSE! I don't want to see OpenSea full of bananas lol
    // the previous amount when it worked was 0.4
    let txn = await domainContract.register("Lincoln",  {value: hre.ethers.utils.parseEther('0.3')});
    await txn.wait();
    console.log("Minted domain Lincoln.ljtron");
  
    txn = await domainContract.setRecord("Lincoln", "Am I a Lincoln or am I ljtron?");
    await txn.wait();
    console.log("Set record for Lincoln.ljtron");
  
    const address = await domainContract.getAddress("Lincoln");
    console.log("Owner of domain pipe:", address);
  
    const balance = await hre.ethers.provider.getBalance(domainContract.address);
    console.log("Contract balance:", hre.ethers.utils.formatEther(balance));
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