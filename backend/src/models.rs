use serde::{Deserialize, Serialize};

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
pub struct HealthData {
    pub status: String,
}

#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct ContactRequest {
    pub name: String,
    pub email: String,
    pub message: String,
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
pub struct ContactResponseData {
    pub delivered: bool,
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
pub struct SocialLink {
    pub label: String,
    pub href: String,
    pub icon: String,
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
pub struct ProfileData {
    pub name: String,
    pub title: String,
    pub summary: String,
    pub journey: String,
    pub enjoys_building: String,
    pub focus_areas: Vec<String>,
    pub availability: String,
    pub location: String,
    pub email: String,
    pub phone: String,
    pub resume_url: String,
    pub socials: Vec<SocialLink>,
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
pub struct EducationItem {
    pub id: String,
    pub degree: String,
    pub institution: String,
    pub start_date: String,
    pub end_date: String,
    pub coursework: Vec<String>,
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
pub struct ExperienceItem {
    pub id: String,
    pub role: String,
    pub organization: String,
    pub location: String,
    pub start_date: String,
    pub end_date: String,
    pub highlights: Vec<String>,
    pub tags: Vec<String>,
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
pub struct SkillCategory {
    pub id: String,
    pub category: String,
    pub skills: Vec<String>,
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
pub struct ProjectLink {
    pub label: String,
    pub href: String,
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
pub struct ProjectItem {
    pub id: String,
    pub name: String,
    pub period: String,
    pub description: String,
    pub highlights: Vec<String>,
    pub tech_stack: Vec<String>,
    pub image_url: Option<String>,
    pub links: Vec<ProjectLink>,
    pub featured: bool,
    pub metrics: Vec<ProjectMetric>,
    pub metrics_note: Option<String>,
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
pub struct ProjectMetric {
    pub label: String,
    pub value: String,
    pub caption: String,
}
