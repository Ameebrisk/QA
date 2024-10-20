const chai = require("chai");
const assert = chai.assert;

const server = require("../server");

const chaiHttp = require("chai-http");
chai.use(chaiHttp);

suite("Functional Tests", function () {
  this.timeout(5000);
  suite("Integration tests with chai-http", function () {
    // #1
    test("Test GET /hello with no name", function (done) {
      chai
        .request(server)
        .keepOpen()
        .get("/hello")
        .end(function (err, res) {
          if (err) {
            console.error(err);
            return done(err);
          }
          assert.equal(res.status, 200);
          assert.equal(res.text, "hello Guest");
          done();
        });
    });
    // #2
    test("Test GET /hello with your name", function (done) {
      chai
        .request(server)
        .keepOpen()
        .get("/hello?name=Amee")
        .end(function (err, res) {
          if (err) {
            console.error(err);
            return done(err);
          }
          assert.equal(res.status, 200);
          assert.equal(res.text, "hello Amee");
          done();
        });
    });
    // #3
    const response = () => ({
      dates: "1451 - 1506",
      name: "Cristoforo",
      surname: "Colombo",
    });

    test('Send {surname: "Colombo"}', function (done) {
      chai
        .request(server)
        .keepOpen()
        .put("/travellers")
        .send({ surname: "Colombo" })
        .end(function (err, res) {
          if (err) return done(err);

          assert.equal(res.status, 200);
          assert.deepEqual(res.body, response());
          // console.log(res.body);
          done();
        });
    });
    // #4
    test('Send {surname: "da Verrazzano"}', function (done) {
      chai
        .request(server)
        .keepOpen()
        .put("/travellers")
        .send({ surname: "da Verrazzano" })
        .end(function (err, res) {
          if (err) return done(err);

          assert.equal(res.status, 200, "success!");
          assert.deepEqual(res.body, {
            dates: "1485 - 1528",
            name: "Giovanni",
            surname: "da Verrazzano",
          });

          // console.log(res.body);
          done();
        });
    });
  });

  const Browser = require("zombie");

  suite("Functional Tests with Zombie.js", function () {
    this.timeout(5000);

    suite("Headless browser", function () {
      test('should have a working "site" property', function () {
        assert.isNotNull(browser.site);
      });
    });

    suite('"Famous Italian Explorers" form', function () {
      // #5
      test('Submit the surname "Colombo" in the HTML form', function (done) {
        assert.fail();

        done();
      });
      // #6
      test('Submit the surname "Vespucci" in the HTML form', function (done) {
        assert.fail();

        done();
      });
    });
  });
});
