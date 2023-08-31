package vttp2023.batch3.csf.assessment.cnserver.services;

import java.io.IOException;
import java.io.InputStream;
import java.util.LinkedList;
import java.util.List;

import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import jakarta.json.Json;
import jakarta.json.JsonObject;
import vttp2023.batch3.csf.assessment.cnserver.models.News;
import vttp2023.batch3.csf.assessment.cnserver.models.TagCount;
import vttp2023.batch3.csf.assessment.cnserver.repositories.ImageRepository;
import vttp2023.batch3.csf.assessment.cnserver.repositories.NewsRepository;

@Service
public class NewsService {
	@Autowired ImageRepository imageRepo;
	@Autowired NewsRepository newsRepo;
	
	// TODO: Task 1
	// Do not change the method name and the return type
	// You may add any number of parameters
	// Returns the news id
	public String postNews (MultipartFile file, String title, String description, String tags) 
	throws IOException {
		String key = "";
		String url = "";
		try {
            String contentType = file.getContentType();
            InputStream is = file.getInputStream();
            key = imageRepo.upload(contentType, is);
            JsonObject resp = Json.createObjectBuilder()
                .add("key", key)
                .build();
			System.out.println(resp);

		} finally {
			url = "https://vttp-davinia.sgp1.digitaloceanspaces.com/" + key;
		}

		long time = System.currentTimeMillis();
		String id = newsRepo.newPost(time, title, description, url, tags);
		return id;
	}
	 
	// TODO: Task 2
	// Do not change the method name and the return type
	// You may add any number of parameters
	// Returns a list of tags and their associated count
	public List<TagCount> getTags(long minutesLimit) {
		long timeLimit = System.currentTimeMillis() - (minutesLimit * 60 * 1000);
		List<Document> docList = newsRepo.getTags(timeLimit);
		List<TagCount> tagList = docList.stream()
			.map( d -> new TagCount(d.getString("_id"), d.getInteger("count")))
			.toList();
		return tagList;
	}

	// TODO: Task 3
	// Do not change the method name and the return type
	// You may add any number of parameters
	// Returns a list of news
	public List<News> getNewsByTag(/* Any number of parameters */) {
		return new LinkedList<>();
	}
	
}
