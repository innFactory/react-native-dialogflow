
Pod::Spec.new do |s|
  s.name         = "ApiAi"
  s.version      = "1.0.0"
  s.summary      = "ApiAi"
  s.description  = <<-DESC
                  ApiAi
                   DESC
  s.homepage     = ""
  s.license      = "MIT"
  # s.license      = { :type => "MIT", :file => "FILE_LICENSE" }
  s.author             = { "author" => "author@domain.cn" }
  s.platform     = :ios, "7.0"
  s.source       = { :git => "https://github.com/author/ApiAi.git", :tag => "master" }
  s.source_files  = "ApiAi/**/*.{h,m}"
  s.requires_arc = true


  s.dependency "React"
  #s.dependency "others"

end

  