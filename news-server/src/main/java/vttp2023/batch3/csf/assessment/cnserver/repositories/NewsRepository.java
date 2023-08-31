package vttp2023.batch3.csf.assessment.cnserver.repositories;

import java.util.List;

import org.bson.Document;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.aggregation.GroupOperation;
import org.springframework.data.mongodb.core.aggregation.LimitOperation;
import org.springframework.data.mongodb.core.aggregation.MatchOperation;
import org.springframework.data.mongodb.core.aggregation.SortOperation;
import org.springframework.data.mongodb.core.aggregation.UnwindOperation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.stereotype.Repository;

import jakarta.json.Json;
import jakarta.json.JsonArrayBuilder;
import jakarta.json.JsonObject;
import jakarta.json.JsonObjectBuilder;

@Repository
public class NewsRepository {
	@Autowired MongoTemplate template;

	// TODO: Task 1 
	// Write the native Mongo query in the comment above the method
		// db.news.insert({
		// 	postDate: 314124,
		// 	title: "test_insert",
		// 	description: "insert_desc",
		// 	image: "insert_url",
		// 	tags: [ "insert1", "insert2" ]
		// })
	public String newPost(long time, String title, String description, String image, String tags) {

		JsonObjectBuilder job = Json.createObjectBuilder()
			.add("postDate", time)
			.add("title", title)
			.add("description", description)
			.add("image", image);

		if (tags != "") {
			JsonArrayBuilder jab = Json.createArrayBuilder();
			String[] tagsArray = tags.split(" ");
			for (int i = 0; i < tagsArray.length; i++) {
				jab.add(i, tagsArray[i]);
			}

			job.add("tags", jab.build());
		}
		JsonObject o = job.build();
		

		Document d = Document.parse(o.toString());
		Document newDoc = template.insert(d, "news");
		ObjectId id = newDoc.getObjectId("_id");
		return id.toString();
	}
	

	// TODO: Task 2 
	// Write the native Mongo query in the comment above the method
		// db.news.aggregate([
		// 	{ $match: { postDate : { $gte: 1000 }} },
		// 	{ $unwind: '$tags' },
		// 	{ $group: {
		// 		tag: '$tags',
		// 		count: { $sum: 1 },
		// 		}},
		// 	{ $sort: { count: -1}},
		// 	{ $limit : 1 }
		// 	])
	public List<Document> getTags(long timeLimit) {
		Criteria c = Criteria.where("postDate").gte(timeLimit);
		MatchOperation match = Aggregation.match(c);
		UnwindOperation unwind = Aggregation.unwind("tags");
		GroupOperation group = Aggregation.group("tags")
			.count().as("count");
		SortOperation sort = Aggregation.sort(Sort.by(Direction.DESC, "count"));
		LimitOperation limit = Aggregation.limit(10);

		Aggregation pipeline = Aggregation.newAggregation(match, unwind, group, sort, limit);
		AggregationResults<Document> results = template.aggregate(pipeline, "news", Document.class);
		return results.getMappedResults();
	}

	// TODO: Task 3
	// Write the native Mongo query in the comment above the method


}
