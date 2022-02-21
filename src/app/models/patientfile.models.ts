export class PatientFile {
  constructor(  
    public uid:number,
    public infos:PersonalInfo,
    public diseases:PatientDisease[],
    public treatments:PatientTreatment[],
  ){}
}
export class PersonalInfo { 
  constructor(
    public oid: string,
    public name: string,
    public firstnames:string,
    public lastname: string,
    public birthname:string,
    public gender:string,
    public birthdate: Date,
    public birthplace_code:string,
    public ins_matricule:string,
    public nir:string,
    public nia:string,
    public address:string,
    public city:string,
    public postalcode:string,
    public phone:string,
    public email:string,
  ){}   
}

export class PatientDisease {
  constructor(
    public maladie:string,
    public startdate:Date,
    public inprogress:boolean,
    public comment:string,
    public associated_treatments:Int16Array,
    public enddate:Date
  ){} 
}

export class PatientTreatment {
  constructor(
    public id:number,
    public name:string,
    public startdate:Date,
    public inprogress:Boolean,
    public posologie:string,
    public comments:string,
    public enddate:Date,
  ){}
}