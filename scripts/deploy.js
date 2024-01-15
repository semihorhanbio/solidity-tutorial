const hre = require("hardhat");
async function main() {
  const keyboardsContract = await hre.ethers.deployContract("Keyboards");
  await keyboardsContract.waitForDeployment();

  console.log("Contract deployed to:", keyboardsContract.target);

  const keyboards = await keyboardsContract.getKeyboards();
  console.log("We got the keyboards!", keyboards);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
