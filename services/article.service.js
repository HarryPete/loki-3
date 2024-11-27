import { Article } from "@/models/article.model";

class articleService
{
    async createArticle(details)
    {
        try
        {
            const newArticle = await Article.create(details);
            await newArticle.save();
            return newArticle
        }
        catch(error)
        {
            console.log(error);
            throw error
        }
    }

    async getArticles()
    {
        try
        {
            const articles = await Article.find();
            return articles
        }
        catch(error)
        {
            throw error
        }
    }

    async getArticleById(id)
    {
        try
        {
            const article = await Article.findById(id);
            return article
        }
        catch(error)
        {
            throw error
        }
    }

    async getArticleByTitle(title)
    {
        try
        {
            const article = await Article.findOne({title})
            return article
        }
        catch(error)
        {
            throw error
        }
    }

    async updateAssociation(articleId, profile)
    {
        try
        {
            await Article.findByIdAndUpdate(articleId, { $push: { associations: profile}});
            return
        }
        catch(error)
        {
            throw error
        }
    }

}

export default articleService