package vttp2023.batch3.csf.assessment.cnserver.controllers;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import jakarta.json.Json;
import jakarta.json.JsonObject;
import vttp2023.batch3.csf.assessment.cnserver.models.TagCount;
import vttp2023.batch3.csf.assessment.cnserver.repositories.ImageRepository;
import vttp2023.batch3.csf.assessment.cnserver.services.NewsService;

@RestController
@RequestMapping("/api")
public class NewsController {
	@Autowired NewsService service;

	// TODO: Task 1
	@PostMapping(path = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE, 
    produces = MediaType.APPLICATION_JSON_VALUE) @ResponseBody
	public ResponseEntity<String> createPost(@RequestPart MultipartFile file,
	@RequestPart String title, @RequestPart String description, @RequestPart(name = "tags", 
	required = false) String tags ) throws IOException {
		if (tags == null) { tags = ""; }
		String id = service.postNews(file, title, description, tags);

		JsonObject o = Json.createObjectBuilder().add("newsId", id).build();
		return ResponseEntity.ok(o.toString());
	}


	// TODO: Task 2
	@GetMapping(path = "/home", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<TagCount>> viewTags(@RequestParam long minutes) {
		System.out.println("GetMapping - viewTags() called");
		List<TagCount> tagList = service.getTags(minutes);
		return ResponseEntity.ok(tagList);
	}


	// TODO: Task 3

}
