export default function adressesEqual(address1, address2) {
  if (!address1 || !address2) return false;
  return address1.toUpperCase() === address2.toUpperCase();
}
