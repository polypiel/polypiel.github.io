module Jekyll
  class RenderTimeTag < Liquid::Tag

    def initialize(tag_name, global, local)
      super
      @global = global
      @local = local
    end

    def render(context)
      global = context.registers[:site].data['global']['title']
      local = context.registers[:page]['title']
      local.nil? ? "#{global}" : "#{global} | #{local}"
    end
  end
end

Liquid::Template.register_tag('title', Jekyll::RenderTimeTag)
