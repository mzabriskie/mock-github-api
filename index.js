var faker = require('faker');
var color = require('color');
var cors = require('cors');
var express = require('express');
var app = express();

app.use(cors());

app.get('/users/:username', function (req, res) {
  res.send(prepare(USER_TEMPLATE, {':username': req.params.username}));
});

app.get('/users/:username/orgs', function (req, res) {
  var params = {':username': req.params.username};

  res.send(JSON.stringify([
    JSON.parse(prepare(ORG_TEMPLATE, params)),
    JSON.parse(prepare(ORG_TEMPLATE, params)),
    JSON.parse(prepare(ORG_TEMPLATE, params)),
    JSON.parse(prepare(ORG_TEMPLATE, params)),
    JSON.parse(prepare(ORG_TEMPLATE, params))
  ]));
});

app.get('/users/:username/repos', function (req, res)  {
  var params = {':username': req.params.username};

  res.send(JSON.stringify([
    JSON.parse(prepare(REPO_TEMPLATE, params)),
    JSON.parse(prepare(REPO_TEMPLATE, params)),
    JSON.parse(prepare(REPO_TEMPLATE, params)),
    JSON.parse(prepare(REPO_TEMPLATE, params)),
    JSON.parse(prepare(REPO_TEMPLATE, params)),
    JSON.parse(prepare(REPO_TEMPLATE, params)),
    JSON.parse(prepare(REPO_TEMPLATE, params)),
    JSON.parse(prepare(REPO_TEMPLATE, params)),
    JSON.parse(prepare(REPO_TEMPLATE, params)),
    JSON.parse(prepare(REPO_TEMPLATE, params)),
    JSON.parse(prepare(REPO_TEMPLATE, params))
  ]));
});

app.listen(3000);

console.log('mock-github-api listening on port 3000');

function prepare(template, params) {
  if (typeof template === 'object') {
    template = JSON.stringify(template);
  }

  if (typeof params === 'object') {
    Object.keys(params).forEach(function (key) {
      template = replaceAll(template, key, params[key]);
    });
  }

  Object.keys(TOKENS).forEach(function (key) {
    template = replaceAll(template, key, TOKENS[key]());
  });

  return template;
}

function replaceAll(subject, find, replace) {
  // Dirty little hack to keep numbers as numbers
  if (find === ':random_number') {
    find = '\":random_number\"';
  }
  return subject.split(find).join(replace);
}

var TOKENS = {
  ':random_number': function () {
    return faker.random.number();
  },

  ':random_date': function () {
    return faker.date.recent().toISOString();
  },

  ':random_email': function () {
    return faker.internet.email();
  },

  ':random_name': function () {
    return faker.random.word();
  },

  ':random_description': function () {
    return faker.random.words();
  },

  ':random_location': function () {
    return faker.address.city() + ', ' + faker.address.stateAbbr();
  },

  ':random_color': function () {
    var r = Math.round(Math.random() * 255);
    var g = Math.round(Math.random() * 255);
    var b = Math.round(Math.random() * 255);
    return color({r, g, b}).hexString().replace(/^#/, '');
  }
};

var USER_TEMPLATE = {
  "login": ":username",
  "id": ":random_number",
  "avatar_url": "https://placehold.it/460/:random_color/ffffff?text=:username",
  "gravatar_id": "",
  "url": "https://api.github.com/users/:username",
  "html_url": "https://github.com/:username",
  "followers_url": "https://api.github.com/users/:username/followers",
  "following_url": "https://api.github.com/users/:username/following{/other_user}",
  "gists_url": "https://api.github.com/users/:username/gists{/gist_id}",
  "starred_url": "https://api.github.com/users/:username/starred{/owner}{/repo}",
  "subscriptions_url": "https://api.github.com/users/:username/subscriptions",
  "organizations_url": "https://api.github.com/users/:username/orgs",
  "repos_url": "https://api.github.com/users/:username/repos",
  "events_url": "https://api.github.com/users/:username/events{/privacy}",
  "received_events_url": "https://api.github.com/users/:username/received_events",
  "type": "User",
  "site_admin": false,
  "name": ":username",
  "company": null,
  "blog": null,
  "location": ":random_location",
  "email": ":random_email",
  "hireable": null,
  "bio": null,
  "public_repos": ":random_number",
  "public_gists": ":random_number",
  "followers": ":random_number",
  "following": ":random_number",
  "created_at": ":random_date",
  "updated_at": ":random_date"
};

var REPO_TEMPLATE = {
  "id": ":random_number",
  "name": ":random_name",
  "full_name": ":username/:random_name",
  "owner": {
    "login": ":username",
    "id": 199035,
    "avatar_url": "https://placehold.it/460/:random_color/ffffff?text=:random_name",
    "gravatar_id": "",
    "url": "https://api.github.com/users/:username",
    "html_url": "https://github.com/:username",
    "followers_url": "https://api.github.com/users/:username/followers",
    "following_url": "https://api.github.com/users/:username/following{/other_user}",
    "gists_url": "https://api.github.com/users/:username/gists{/gist_id}",
    "starred_url": "https://api.github.com/users/:username/starred{/owner}{/repo}",
    "subscriptions_url": "https://api.github.com/users/:username/subscriptions",
    "organizations_url": "https://api.github.com/users/:username/orgs",
    "repos_url": "https://api.github.com/users/:username/repos",
    "events_url": "https://api.github.com/users/:username/events{/privacy}",
    "received_events_url": "https://api.github.com/users/:username/received_events",
    "type": "User",
    "site_admin": false
  },
  "private": false,
  "html_url": "https://github.com/:username/:random_name",
  "description": ":random_description",
  "fork": true,
  "url": "https://api.github.com/repos/:username/:random_name",
  "forks_url": "https://api.github.com/repos/:username/:random_name/forks",
  "keys_url": "https://api.github.com/repos/:username/:random_name/keys{/key_id}",
  "collaborators_url": "https://api.github.com/repos/:username/:random_name/collaborators{/collaborator}",
  "teams_url": "https://api.github.com/repos/:username/:random_name/teams",
  "hooks_url": "https://api.github.com/repos/:username/:random_name/hooks",
  "issue_events_url": "https://api.github.com/repos/:username/:random_name/issues/events{/number}",
  "events_url": "https://api.github.com/repos/:username/:random_name/events",
  "assignees_url": "https://api.github.com/repos/:username/:random_name/assignees{/user}",
  "branches_url": "https://api.github.com/repos/:username/:random_name/branches{/branch}",
  "tags_url": "https://api.github.com/repos/:username/:random_name/tags",
  "blobs_url": "https://api.github.com/repos/:username/:random_name/git/blobs{/sha}",
  "git_tags_url": "https://api.github.com/repos/:username/:random_name/git/tags{/sha}",
  "git_refs_url": "https://api.github.com/repos/:username/:random_name/git/refs{/sha}",
  "trees_url": "https://api.github.com/repos/:username/:random_name/git/trees{/sha}",
  "statuses_url": "https://api.github.com/repos/:username/:random_name/statuses/{sha}",
  "languages_url": "https://api.github.com/repos/:username/:random_name/languages",
  "stargazers_url": "https://api.github.com/repos/:username/:random_name/stargazers",
  "contributors_url": "https://api.github.com/repos/:username/:random_name/contributors",
  "subscribers_url": "https://api.github.com/repos/:username/:random_name/subscribers",
  "subscription_url": "https://api.github.com/repos/:username/:random_name/subscription",
  "commits_url": "https://api.github.com/repos/:username/:random_name/commits{/sha}",
  "git_commits_url": "https://api.github.com/repos/:username/:random_name/git/commits{/sha}",
  "comments_url": "https://api.github.com/repos/:username/:random_name/comments{/number}",
  "issue_comment_url": "https://api.github.com/repos/:username/:random_name/issues/comments{/number}",
  "contents_url": "https://api.github.com/repos/:username/:random_name/contents/{+path}",
  "compare_url": "https://api.github.com/repos/:username/:random_name/compare/{base}...{head}",
  "merges_url": "https://api.github.com/repos/:username/:random_name/merges",
  "archive_url": "https://api.github.com/repos/:username/:random_name/{archive_format}{/ref}",
  "downloads_url": "https://api.github.com/repos/:username/:random_name/downloads",
  "issues_url": "https://api.github.com/repos/:username/:random_name/issues{/number}",
  "pulls_url": "https://api.github.com/repos/:username/:random_name/pulls{/number}",
  "milestones_url": "https://api.github.com/repos/:username/:random_name/milestones{/number}",
  "notifications_url": "https://api.github.com/repos/:username/:random_name/notifications{?since,all,participating}",
  "labels_url": "https://api.github.com/repos/:username/:random_name/labels{/name}",
  "releases_url": "https://api.github.com/repos/:username/:random_name/releases{/id}",
  "deployments_url": "https://api.github.com/repos/:username/:random_name/deployments",
  "created_at": ":random_date",
  "updated_at": ":random_date",
  "pushed_at": ":random_date",
  "git_url": "git://github.com/:username/:random_name.git",
  "ssh_url": "git@github.com::username/:random_name.git",
  "clone_url": "https://github.com/:username/:random_name.git",
  "svn_url": "https://github.com/:username/:random_name",
  "homepage": null,
  "size": ":random_number",
  "stargazers_count": 0,
  "watchers_count": 0,
  "language": "JavaScript",
  "has_issues": false,
  "has_downloads": true,
  "has_wiki": true,
  "has_pages": false,
  "forks_count": 0,
  "mirror_url": null,
  "open_issues_count": 0,
  "forks": 0,
  "open_issues": 0,
  "watchers": 0,
  "default_branch": "master"
};

var ORG_TEMPLATE = {
  "login": ":random_name",
  "id": ":random_number",
  "url": "https://api.github.com/orgs/:random_name",
  "repos_url": "https://api.github.com/orgs/:random_name/repos",
  "events_url": "https://api.github.com/orgs/:random_name/events",
  "hooks_url": "https://api.github.com/orgs/:random_name/hooks",
  "issues_url": "https://api.github.com/orgs/:random_name/issues",
  "members_url": "https://api.github.com/orgs/:random_name/members{/member}",
  "public_members_url": "https://api.github.com/orgs/:random_name/public_members{/member}",
  "avatar_url": "https://placehold.it/460/:random_color/ffffff?text=:random_name",
  "description": ":random_description"
};
