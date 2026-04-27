import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("InventoryModule", (m) => {
  const inventory = m.contract("Inventory", []);
  return { inventory };
});
