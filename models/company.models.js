const psql = require("../configs/db.js");

// constructor
const Company = function(company) {
  this.company_id=company.company_id;
  this.company_name = company.company_name;
  this.company_nationality = company.company_nationality;
  this.company_phone_number = company.company_phone_number;
  this.company_headquarters = company.company_headquarters;
  this.company_address = company.company_address;
  this.company_department = company.company_department;
  this.company_city = company.company_city;
  this.company_rcs = company.company_rcs;
  this.company_zip_code = company.company_zip_code;
  this.company_country = company.company_country;
  this.company_representative_id = company.company_representative_id;
  this.company_representative_status = company.company_representative_status;
  this.is_partner = company.is_partner;
  this.partner_type = company.partner_type;
  this.consultant_id = company.consultant_id;
  this.company_presentation_pdf = company.company_presentation_pdf;
  this.company_presentation_video = company.company_presentation_video;
  this.company_activity = company.company_activity;
  this.company_history = company.company_history;
  this.company_location = company.company_location;
  this.company_logo = company.company_logo;
  this.company_contrat = company.company_contrat;
  this.company_siret = company.company_siret;
  this.company_ape = company.company_ape;
  this.company_tva=company.company_tva;
  this.company_president=company.company_president;
};

Company.createCompany =(user_id,result)=>{
  psql.query('INSERT INTO company (company_representative_id) VALUES ($1) RETURNING company_id',[user_id],
  (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null,res);
  });
}

Company.createFullCompany = (company,result)=>{ 

  psql.query('INSERT INTO company (company_name,  company_address, company_representative_id, company_representative_status , company_phone_number, company_headquarters , company_rcs , is_partner , partner_type ,consultant_id ,company_contrat ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING company_id',
  [
    company.company_name,
    company.company_address,
    company.company_representative_id,
    company.company_representative_status,
    company.company_phone_number,
    company.company_headquarters,
    company.company_rcs,
    company.is_partner,
    company.partner_type,
    company.consultant_id,
    company.company_contrat,

  ], 
  (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    console.log(res)
    result(null,res);
  });
}


Company.updateCompanyInfo = (company,result)=>{ 

  psql.query('UPDATE company SET'+
  ' company_name =$2 , company_nationality = $3 , company_address= $4 , company_department = $5 , company_representative_status = $6 , company_phone_number= $7 , company_headquarters = $8 , company_city = $9 , company_rcs = $10 , company_zip_code =$11 , company_country = $12 , is_partner = $13 , partner_type = $14 ,consultant_id =$15 ,company_presentation_pdf = $16 , company_presentation_video = $17 WHERE company_id = $1 RETURNING company_id',
  [
    company.company_id,
    company.company_name,
    company.company_nationality,
    company.company_address,
    company.company_department,
    company.company_representative_status,
    company.company_phone_number,
    company.company_headquarters,
    company.company_city,
    company.company_rcs,
    company.company_zip_code,
    company.company_country,
    company.is_partner,
    company.partner_type,
    company.consultant_id,
    company.company_presentation_pdf,
    company.company_presentation_video
  ], 
  (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null,res);
  });
}

Company.updateConsultantCompanyInfo = (company,result)=>{ 
  console.log(company)
  psql.query('UPDATE company SET'+
  ' company_name =$2 , company_nationality = $3 , company_address= $4 , company_department = $5 , company_history = $6 , company_phone_number= $7 , company_headquarters = $8 , company_city = $9 , company_rcs = $10 , company_zip_code =$11 , company_country = $12 , company_siret = $13 , company_ape = $14 ,company_activity =$15  WHERE company_id = $1 RETURNING company_id',
  [
    company.company_id,
    company.company_name,
    company.company_nationality,
    company.company_address,
    company.company_department,
    company.company_history,
    company.company_phone_number,
    company.company_headquarters,
    company.company_city,
    company.company_rcs,
    company.company_zip_code,
    company.company_country,
    company.company_siret,
    company.company_ape,
    company.company_activity,
  ], 
  (err, res) => {
    //console.log(res)
    //console.log(err)

    if (err) {
      result(err, null);
      return;
    }
    result(null,res);
  });
}

Company.getCompanyInfo = (user_id,result)=>{
  psql.query('SELECT  '+
  'company_id,'+
  'company_name,'+
  'company_president,'+
  'company_nationality,'+
  'company_phone_number,'+
  'company_headquarters,'+
  'company_address,'+
  'company_department,'+
  'company_city,'+
  'company_rcs,'+
  'company_siret,'+
  'company_zip_code,'+
  'company_country,'+
  'company_representative_id,'+
  'company_representative_status,'+
  'is_partner,'+
  'partner_type,'+
  'consultant_id,'+
  'company_presentation_pdf,'+
  'company_presentation_video,'+
  'company_activity,'+
  'company_history,'+
  'company_location,'+
  'company_ape,'+
  'company_tva,'+
  'company_logo,'+
  'company_contrat,'+
  'user_email as company_email,'+
  'user_name as company_consultant_name,'+
  'user_firstname as company_consultant_firstname,'+
  'user_profile as company_consultant_profile,'+
  'user_calendly as company_consultant_calendly '+

  'FROM company JOIN users ON user_id=consultant_id JOIN user_info ON users.user_id = user_info.user_id WHERE company_representative_id = $1',[user_id],
  (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
   // console.log(res.rows)
    result(null,res);
  });
}


Company.getCompanyInfoById = (id,result)=>{
  psql.query('SELECT  '+
  'company_id,'+
  'company_name,'+
  'company_president,'+
  'company_nationality,'+
  'company_phone_number,'+
  'company_headquarters,'+
  'company_address,'+
  'company_department,'+
  'company_city,'+
  'company_rcs,'+
  'company_siret,'+
  'company_zip_code,'+
  'company_country,'+
  'company_representative_id,'+
  'company_representative_status,'+
  'is_partner,'+
  'partner_type,'+
  'consultant_id,'+
  'company_presentation_pdf,'+
  'company_presentation_video,'+
  'company_activity,'+
  'company_history,'+
  'company_location,'+
  'company_logo,'+
  'company_ape,'+
  'company_tva,'+
  'company_contrat,'+
  'user_name as company_consultant_name,'+
  'user_firstname as company_consultant_firstname,'+
  'user_profile as company_consultant_profile,'+
  'user_email as company_email,'+
  'user_calendly as company_consultant_calendly '+

  'FROM company JOIN users ON user_id=consultant_id JOIN user_info ON users.user_id = user_info.user_id WHERE company_id = $1',[id],
  (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
   // console.log(res.rows)
    result(null,res);
  });
}

Company.getCompanyInfoByName = (company_name,result)=>{
  psql.query("SELECT * FROM company WHERE LOWER(REPLACE(company_name,' ', '-'))=$1;",[company_name],
  (err, res) => {
   // console.log(res.rows)
    if (err) {
      result(err, null);
      return;
    }
    result(null,res);
  });
}

Company.getAllCompany = (result)=>{
  psql.query('SELECT company_name FROM company',
  (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null,res);
  });
}

Company.uploadCompanyLogo = (data,result)=>{
  psql.query('UPDATE company SET company_logo = $1 WHERE company_id=$2',[data.company_logo,data.company_id],
  (err, res) => {
    
    if (err) {
      result(err, null);
      return;
    }
    result(null,res);
  });
}

Company.uploadCompanyPresentationPdf = (data,result)=>{
  psql.query('UPDATE company SET company_presentation_pdf = $1 WHERE company_id=$2',[data.company_presentation_pdf,data.company_id],
  (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null,res);
  });
}

Company.uploadCompanyPresentationVideo = (data,result)=>{
  psql.query('UPDATE company SET company_presentation_video = $1 WHERE company_id=$2',[data.company_presentation_video,data.company_id],
  (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null,res);
  });
}

module.exports = Company;