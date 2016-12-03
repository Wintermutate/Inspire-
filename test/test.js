var supertest = require("supertest");
var should = require("chai").should();
var expect = require("chai").expect();

var server = supertest.agent("http://localhost:8080");

describe("Home Page", function(){
	it("should return home page", function(done){
		server
		.get("/")
		.expect("Content-type", /html/)
		.expect(200)
		.end(function(err,res){
			res.status.should.equal(200);
			done();
		});
	});
});

describe("CMS", function(){
	it("should return CMS", function(done){
		server
		.get("/admin")
		.expect("Content-type", /html/)
		.expect(200)
		.end(function(err,res){
			res.status.should.equal(200);
			done();
		});
	});
});

describe("content route", function(){

	it("/spotify should return JSON of all songs", function(done){
		server
		.get("/spotify")
		.expect(200)
		.expect("Content-type", /json/)
		.end(function(err,res){
			res.body.should.be.a("object");
			done();
		});
	});

});

describe("post route", function(){

	it("/new should add new content", function(done){
		server
		.post("/new")
		.send({content:"I have a dream... - Martin Luther King Jr.", contentType:"quotes"})
		.expect(200)
		.expect("Content-type", /json/)
		.end(function(err,res){
			res.body.should.be.a("object");
			done();
		});
	});

});

describe("post route for saves", function(){

	it("/save should add content to user favorite table", function(done){
		server
		.post("/new")
		.send({email:"random@random.com", content:"2nBI3iWLhupR7LyAJ5GGkE"})
		.expect(200)
		.expect("Content-type", /json/)
		.end(function(err,res){
			res.body.should.be.a("object");
			done();
		});
	});

});