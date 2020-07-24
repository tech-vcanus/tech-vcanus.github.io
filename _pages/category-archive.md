---
layout: archive
permalink: /categories/
title: "Posts by Category"
author_profile: true
---
{% include group-by-array collection=site.posts field="categories" %}
<ul>
  {% for category in site.categories %}
    <span>
      <a href="#{{ category | first | slugify }}">
        {{ category | first }}
      </a> &nbsp;&nbsp;&nbsp;
    </span>
  {% endfor %}
</ul>
<br/>
<br/>
{% for category in group_names %}
  {% assign posts = group_items[forloop.index0] %}
  <h2 id="{{ category | slugify }}" class="archive__subtitle">{{ category }}</h2>
  {% for post in posts %}
    {% include archive-single.html %}
  {% endfor %}
{% endfor %}