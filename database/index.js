const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  repo: {
    id: Number,
    name: String,
    url: String
  },
  user: {
    name: String,
    url: String
  }
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repos) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB

  for (var i = 0; i < repos.length; i++) {
    var newRepo = repos[i];

    Repo.find({repo:{id: newRepo.id}}, (err) => {
      if (err) {
        var info = {
          repo: {
            id: newRepo.id,
            name: newRepo.name,
            url: newRepo.html_url
          },
          user: {
            name: newRepo.owner.login,
            url: newRepo.owner.html_url
          }
        };

        newRepo = new Repo(info);
        newRepo.save((err, newRepo) => {
          if (err) {
            console.error(err);
          }
          console.log(`Saved repo ${newRepo.repo.name} by ${newRepo.user.name}`);
        });
      }
    });
  }
}

module.exports.save = save;