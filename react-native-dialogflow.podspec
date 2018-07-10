require 'json'

package = JSON.parse(File.read(File.join(__dir__, 'package.json')))

Pod::Spec.new do |spec|
  spec.name = package['name']
  spec.version = package['version']
  spec.author = package['author']
  spec.license = package['license']
  spec.homepage = package['repository']['url']
  spec.source = {
    :git => "#{package['repository']['url']}.git"
  }
  spec.summary = package['description']
  spec.source_files = 'ios/**/*.{h,m}'
  spec.platform = :ios, '8.0'
  spec.dependency 'React'
end
