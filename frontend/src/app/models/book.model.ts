class Book {
  title:string;
  typeB:string;
  created_date:Date;
  description:string;
  address:string;
  status:string;
  phoneNumber:number;



  

  constructor() {
    this.title = '';
    this.typeB = '';
    this.description='';
    this.address='';
    this.status='';
    this.phoneNumber=0;
    
    
  }
}

export default Book;
