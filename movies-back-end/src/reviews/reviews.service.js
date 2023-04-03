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
        .select("c.*",
            "r.*",
            "r.created_at as r_created_at",
            "r.updated_at as r_updated_at",
            "r.critic_id as r_critic_id")
        .where({ "r.review_id": review_id })
        .first()
        .then(addCritics)
}

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
}