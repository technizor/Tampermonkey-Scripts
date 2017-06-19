This script is useful to test subreddit style changes on a live subreddit without making the changes apply to all users or needing to make the subredit private for testing.

Steps:

1. Set up a "staging" subreddit that is public and optionally readonly. This will be where you deploy all of your testing changes. You can make posts on comments on there for testing things quickly, but that may be undesirable because it would then require making a dummy account for those posts or it would clog part of your user post/comment history with test subreddit content.
2. Set up the sidebar information. Usually CSS hacks require using the sidebar content to inject announcement functionality or navigation tools somewhere onto the page with the magic of absolute positioning.
3. Install Tampermonkey and add the script.
4. Customize the script to pull the data from your staging subreddit and modify the domain filter so it only runs on the subreddit you are testing changes on.
5. Go to a page and the userscript will replace the CSS and sidebar content, showing the testing changes.

Note: Due to differences in flair systems, you shouldn't expect this to work fully on subreddits you have no control over because of their custom implementation differences and because there are some things that you cannot properly test (e.g. new user flairs or post flairs) without making some of that public on the live subreddit or by testing directly on the staging subreddit. **This is just an aid for testing changes with real user content.**
