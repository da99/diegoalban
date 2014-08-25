
require 'cuba'
require 'rack/protection'
require 'securerandom'
require 'da99_rack_middleware'

Cuba.use Da99_Rack_Middleware

Cuba.define do

  on(get) {

    on 'googlehostedservice.html' do
      res.write 'googled80ce82f00e7fc31'
    end

    on root do
      res.write <<-EOF.strip
        <html>
          <body>
            <p>Go to:</p>
            <a href="http://www.megauni.com/salud/">megauni.com/salud</a><body>
          </body>
        </html>
      EOF
    end
  }

end # === Cuba.define
