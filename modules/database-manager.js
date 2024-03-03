const mysql = require("mysql2");

class DataBase {
	constructor (host, user, database, password) {
		this.db = mysql.createConnection({
		  	host: host,
		  	user: user,
		  	database: database,
		  	password: password
		});

		this.db.query("SET SESSION wait_timeout = 604800");

		this.db.connect();
	}

	select (object_) {
		return new Promise((resolve, reject) => {
			let table = object_.table;
			delete object_.table;
	
			let array = Object.entries(object_);
			let request;
	
			if ((typeof array[0][1]) == "string") {
				request = `SELECT * FROM ${table} WHERE ${array[0][0]} = '${array[0][1]}'`;
			}else {
				request = `SELECT * FROM ${table} WHERE ${array[0][0]} = ${array[0][1]}`;
			}
	
			this.db.query(request, (err, rows, field) => resolve(rows));
		});		
	}


	select_all(table) {
		return new Promise((resolve, reject) => {
			let request = `SELECT * FROM ${table}`;
			this.db.query(request, (err, rows, field) => resolve(rows));
		});
	}


	insert_into (object_) {
		return new Promise((resolve, reject) => {
			let table = object_.table;
			delete object_.table;
	
			let array = Object.entries(object_);
			let request;
	
			let keys = "";
			let values = "";
	
			for (let i = 0; i < array.length; i++) {
				if (array[i][0] === array.at(-1)[0]) {keys += `${array[i][0]}`;}
				else {keys += `${array[i][0]}, `;}
			}
	
			for (let i = 0; i < array.length; i++) {
				if (typeof array[i][1] == "string") {
					if (array[i][1] === array.at(-1)[1]) {values += `'${array[i][1]}'`;}
					else {values += `'${array[i][1]}', `;}
				}else {
					if (array[i][1] === array.at(-1)[1]) {values += `${array[i][1]}`;}
					else {values += `${array[i][1]}, `;}
				}
			}
	
			request = `INSERT INTO ${table}(${keys}) VALUES (${values})`;
			this.db.query(request, (err, rows, field) => resolve());
		});
	}

	delete (object_) {
		return new Promise((resolve, reject) => {
			let table = object_.table;
			delete object_.table;
	
			let array = Object.entries(object_);
			let request;
	
			if ((typeof array[0][1]) == "string") {
				request = `DELETE FROM ${table} WHERE ${array[0][0]} = '${array[0][1]}'`;
			}else {
				request = `DELETE FROM ${table} WHERE ${array[0][0]} = ${array[0][1]}`;
			}
	
			this.db.query(request, (err, rows, field) => resolve());
		});
	}

	update (object_) {
		return new Promise((resolve, reject) => {
			let table = object_.table;
			delete object_.table;
	
			let search = Object.entries(object_.where);
			let new_data = Object.entries(object_.colamns);
			let request;
	
			let colamns = "";
	
			for (let i = 0; i < new_data.length; i++) {
				if (typeof new_data[i][1] == "string") {
					if (new_data[i][1] === new_data.at(-1)[1]) {colamns += `${new_data[i][0]} = '${new_data[i][1]}'`;}
					else {colamns += `${new_data[i][0]} = '${new_data[i][1]}', `;}
				}else {
					if (new_data[i][1] === new_data.at(-1)[1]) {colamns += `${new_data[i][0]} = ${new_data[i][1]}`;}
					else {colamns += `${new_data[i][0]} = ${new_data[i][1]}, `;}
				}
			}
	
			if ((typeof search[0][1]) == "string") {
				request = `UPDATE ${table} SET ${colamns} WHERE ${search[0][0]} = '${search[0][1]}'`;
			}else {
				request = `UPDATE ${table} SET ${colamns} WHERE ${search[0][0]} = ${search[0][1]}`;
			}
			
			this.db.query(request, (err, rows, field) => resolve());
		});
	}

}

module.exports = DataBase;