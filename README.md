# Overview
Thanks for your interest in annalise.ai. 😀

This exercise has been designed to demonstrate your skills and experience, and to provide talking points for your Round 
2 interview. 

The goal of this exercise is to provide a cloud-deployable backend API for
 - image uploading
 - image downloading

From a technical perspective, the solution should
 - Use TypeScript or Python (with type annotations)
 - Provide endpoints to support image uploading & downloading
 - Persist file metadata to a database (e.g. file name)
 - Provide unit tests
 - Include a bare minimum authentication solution

The solution should include a README with instructions, justification of technology choices etc. 
(i.e. replace this file)

We've provided an initial TypeScript starter pack with koa, eslint, jest etc. and a suggested file structure.
**You're under no obligation to use it**, but it should get you up and running quickly.

## Your time

Your time is valuable. We've tried to balance our need to find committed, talented candidates with respect for your time.
We don't expect you to spend more than about 4 hours on this exercise.

Here are some corners you can cut.

### Deployment & dev-ops
 - Not needed in this exercise. We'll talk about possible approaches in the interview 
 - Everything can be run locally i.e. cloud deployable, not cloud deployed

### Testing
 - Just unit tests - no need for integration & functional tests, unless you'd prefer those instead

### Authentication
 - Use middleware etc. to support the absolute bare minimum
 - (i.e. no need to store user tokens in the db etc)
 - Looking for more of a proof of concept for discussion

### Database
 - Use e.g. mysql via docker compose
 - Or if you'd prefer, a cloud based database
 - No need for indices or optimisation of any kind

### File storage
 - Local file storage is ok, **however**
 - Try to abstract the storage, so it could, potentially, be changed to support AWS S3 or similar

# How will the exercise be evaluated?

Apart from meeting the above, we'll be looking at 
 - How have you organised the routes in a RESTful way?
 - Is the solution robust to bad inputs?
 - Limits e.g. on file sizes
 - How easy would it be for a colleague to pick up your solution and run it, and work on it, without assistance?
