export class NaturalPerson {
  public firstName: string | undefined;
  public lastName: string | undefined;
  public birthDate: Date | undefined;
  public birthPlace: string | undefined;
  public address: string | undefined;
  public pesel: string | undefined;
  public idCardNumber: string | undefined;

  constructor(
    firstName: string | undefined,
    lastName: string | undefined,
    birthDate: Date | undefined,
    birthPlace: string | undefined,
    address: string | undefined,
    pesel: string | undefined,
    idCardNumber: string | undefined
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthDate = birthDate;
    this.birthPlace = birthPlace;
    this.address = address;
    this.pesel = pesel;
    this.idCardNumber = idCardNumber;
  }
}
