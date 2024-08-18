class ApiFeatures {
    constructor(query, queryStr) {
      this.query = query;
      this.queryStr = queryStr;
      this.page = 1;
      this.limit = 10;
    }
  
    search() {
      const keyword = this.queryStr.keyword
        ? {
            name: {
              $regex: this.queryStr.keyword,
              $options: 'i',
            },
          }
        : {};
  
      this.query = this.query.find({ ...keyword });
      return this;
    }
  
    filter() {
      const queryCopy = { ...this.queryStr };
      const removeFields = ['keyword', 'limit', 'page', 'sort'];
      removeFields.forEach((el) => delete queryCopy[el]);
  
      let queryStr = JSON.stringify(queryCopy);
      queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);
  
      this.query = this.query.find(JSON.parse(queryStr));
      return this;
    }
  
    sort() {
      if (this.queryStr.sort) {
        const sortBy = this.queryStr.sort.split(',').join(' ');
        this.query = this.query.sort(sortBy);
      } else {
        this.query = this.query.sort('-createdAt');
      }
      return this;
    }
  
    paginate() {
      this.page = Number(this.queryStr.page) || 1;
      this.limit = Number(this.queryStr.limit) || 10;
      const skip = (this.page - 1) * this.limit;
  
      this.query = this.query.skip(skip).limit(this.limit);
      return this;
    }
  }
  
  module.exports = ApiFeatures;