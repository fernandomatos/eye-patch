const fs = require('fs');
const express = require('express');
const formidable = require('formidable');
 
const app = express();

function EyePatch(){
	app.get('/', (req, res) => {
	res.send(`
		<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" />

		<div class="container h-100">
			<div class="row h-100 justify-content-center align-items-center">
				<div class="col-md-12">
					<h1>Tibia Client — BattlEye Removal Tool</h1>
					<hr />
					<div class="card" style="width: 100%">
						<div class="card-body">
							<h5 class="card-title">Use this tool to remove BattlEye of your client.exe</h5>
							<p class="card-text">Select your client file, click to upload, download & ovewrite your <b>client.exe</b> in the <i>/bin</i> folder.</p>
							<form class="form" action="/" enctype="multipart/form-data" method="post">
								<div class="form-group">
									<label for="exampleInputEmail1">Select your Tibia Client (client.exe)</label>
									<input type="file" class="form-control-file" aria-describedby="clientHelp" name="client">
									<small id="clientHelp" class="form-text text-muted">In your /bin folder.</small>
								</div>
								<button type="submit" class="btn btn-success">Upload</button>
							</form>
						</div>
					</div>
					<div class="text-center mt-2">
					<a href="https://github.com/fernandomatos/eye-patch" target="_blank">https://github.com/fernandomatos/eye-patch</a>
					</div>
				</div>
			</div>
		</div>
	  `);
	});
 
	app.post('/', (req, res, next) => {
	  const form = formidable({ multiples: false });
	 
	  form.parse(req, (err, fields, files) => {
		if (err) {
		  next(err);
		  return;
		}

		const file = fs.readFileSync(files['client']['path']);
		const str = file.toString("hex");

		let newStr = str.replace("c645d700c645cf00", "c645d700c645cf01");
		let buffer = Buffer.from(newStr, "hex"); 

		res.setHeader('Content-disposition', 'attachment; filename=' + files['client']['name']);
		res.setHeader('Content-type', files['client']['type']);
		res.write( buffer );
		res.end();
	  });
	});
	 
	return app.listen(3000, () => {
	  console.log('Access http://localhost:3000 on your browser to continue...');
	});
}


module.exports = EyePatch;

