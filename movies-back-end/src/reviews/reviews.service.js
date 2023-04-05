const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

const addCritics = mapProperties({
    r_critic_id: "critic.critic_id",
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",
    organization_name: "critic.organization_name",
    r_created_at: "critic.created_at",
    r_updated_at: "critic.updated_at"
});

function list() {
    return knex("reviews").select("*");
}

function addCriticInfo(review_id) {
    return knex("critics as c")
        .join("reviews as r", "c.critic_id", "r.critic_id")
        //since three are repreated column names between reviews and movies, i needed to alias the repeated
        //column to then use them in map properties
        .select("c.*",
            "r.*",
            "r.created_at as r_created_at",
            "r.updated_at as r_updated_at",
            "r.critic_id as r_critic_id")
        .where({ "r.review_id": review_id })
        .first()
        .then(addCritics)
}

/*
this turned out to be a simpler way to add critic info to the review where you return reviews based on movie id
and then based on teh array of data returned, you map over that data and perform the addCriticInfo map to each review
this takes out the need for a Promise.all in the controller and reduces the ammount of steps in the controllers list function

function addCritic(movie_id) {
    return knex("critics as c")
        .join("reviews as r", "c.critic_id", "r.critic_id")
        //since three are repreated column names between reviews and movies, i needed to alias the repeated
        //column to then use them in map properties
        .select("c.*",
            "r.*",
            "r.created_at as r_created_at",
            "r.updated_at as r_updated_at",
            "r.critic_id as r_critic_id")
        .where({ movie_id })
        .then(data => data.map(review => addCritics(review)))
}

*/

function read(review_id) {
    return knex("reviews")
        .select("*")
        .where({ review_id })
        .first()
}

function update(updatedReview) {
    return knex("reviews")
        .select("*")
        .where({ review_id: updatedReview.review_id })
        .update(updatedReview)
        //this would normally be (updatedReview, "*").then(data => data[0])
        //to return an array of all the column from the updated review and then return the first element in teh array
        //but the test uses sqlite3 and not postgresql
}

function destroy(review_id) {
    return knex("reviews")
        .where({review_id})
        .del()
}

module.exports = {
    list,
    read,
    update,
    addCriticInfo,
    delete: destroy,
    //addCritic
}