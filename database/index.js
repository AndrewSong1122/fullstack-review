const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  repoId: Number,
  repoName: String,
  repoUrl: String,
  userName: String,
  repoUrl: String
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repos, ind = 0) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB

  newRepo = repos[ind];
  var username = newRepo.owner.login;
  if (ind === 0) {
    Repo.deleteMany({userName: username}, (err) => {
        var info = {
        repoId: newRepo.id,
        repoName: newRepo.name,
        repoUrl: newRepo.html_url,
        userName: newRepo.owner.login,
        userUrl: newRepo.owner.html_url
      };

      newRepo = new Repo(info);
      newRepo.save((err, newRepo) => {
        if (err) {
          console.error(err);
        }
        console.log(`Saved repo ${newRepo.repoName} by ${newRepo.userName}`);
        if ((ind + 1) !== repos.length && (ind + 1) !== 25) {
          save(repos, ind + 1);
        }
      });
    });
  } else {
      var info = {
        repoId: newRepo.id,
        repoName: newRepo.name,
        repoUrl: newRepo.html_url,
        userName: newRepo.owner.login,
        userUrl: newRepo.owner.html_url
      };

    newRepo = new Repo(info);
    newRepo.save((err, newRepo) => {
      if (err) {
        console.error(err);
      }
      console.log(`Saved repo ${newRepo.repoName} by ${newRepo.userName}`);
      if ((ind + 1) !== repos.length && (ind + 1) !== 25) {
        save(repos, ind + 1);
      }
    });
  }

  // for (var i = 0; i < repos.length; i++) {
  //   console.log(`loop ${i}`);
  //   var newRepo = repos[i];
  //   Repo.find({repo:{id: newRepo.id}}, (err) => {
  //     if (!err) {

  //       // var info = {
  //       //   repo: {
  //       //     id: newRepo.id,
  //       //     name: newRepo.name,
  //       //     url: newRepo.html_url
  //       //   },
  //       //   user: {
  //       //     name: newRepo.owner.login,
  //       //     url: newRepo.owner.html_url
  //       //   }
  //       // };

  //       // newRepo = new Repo(info);
  //       // newRepo.save((err, newRepo) => {
  //       //   if (err) {
  //       //     console.error(err);
  //       //   }
  //       //   console.log(`Saved repo ${newRepo.repo.name} by ${newRepo.user.name}`);
  //       // });

  //       console.log('attempt to save');
  //       console.log(newRepo);

  //       var info = {
  //         repo: {
  //           id: newRepo.id,
  //           name: newRepo.name,
  //           url: newRepo.html_url
  //         },
  //         user: {
  //           name: newRepo.owner.login,
  //           url: newRepo.owner.html_url
  //         }
  //       };

  //       newRepo = new Repo(info);
  //       newRepo.save((err, newRepo) => {
  //         if (err) {
  //           console.error(err);
  //         }
  //       });
  //     } else {
  //       console.log('kill you');
  //     }
  //     Repo.find({user:{name: 'octocat'}},(err, repos) => {
  //       console.log('you did something right for once');
  //       console.log(repos);
  //     })
  //   });
  // }
}

module.exports.save = save;