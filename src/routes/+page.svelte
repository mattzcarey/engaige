<script lang="ts">
  import type { GeneratedContent, Testimonial, Feature } from "$lib/types";
  import { onMount } from "svelte";
  import { page } from "$app/stores";

  let hero = "AI-Powered Solutions for Tomorrow's Challenges";
  let description =
    "Leverage cutting-edge artificial intelligence to transform your business operations and unlock new possibilities.";
  let cta = "Start Your AI Journey";
  let features: Array<Feature> = [
    {
      title: "Lightning Fast",
      description: "Experience AI-powered results in milliseconds",
      icon: "M13 10V3L4 14h7v7l9-11h-7z",
    },
    {
      title: "Secure & Private",
      description: "Enterprise-grade security for your peace of mind",
      icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
    },
    {
      title: "Scalable",
      description: "Grows with your business needs seamlessly",
      icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
    },
  ];
  let testimonials: Array<Testimonial> = [
    {
      name: "John Doe",
      jobtitle: "Developer",
      message: "Great product!",
    },
    {
      name: "Jane Smith",
      jobtitle: "Designer",
      message: "Awesome service!",
    },
  ];

  onMount(async () => {
    try {
      // get the key search param from the page store
      const key = $page.url.searchParams.get("key");
      const response = await fetch(`/api/copy?key=${key}`);
      const data = (await response.json()) as GeneratedContent;

      hero = data.hero || hero;
      description = data.description || description;
      cta = data.cta || cta;
      features = data.features || features;
      testimonials = data.testimonials || testimonials;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  });
</script>

<svelte:head>
  <title>EnGaige - Home</title>
</svelte:head>

<!-- Hero Section -->
<div class="bg-gradient-to-r from-indigo-600 to-purple-600">
  <div class="container mx-auto px-4 py-20">
    <div class="max-w-4xl mx-auto text-center">
      <h1
        class="text-5xl md:text-6xl font-bold text-white mb-8 animate-fade-in"
      >
        {hero}
      </h1>
      <p class="text-xl text-gray-200 mb-12 leading-relaxed">
        {description}
      </p>
      <button
        class="bg-white text-indigo-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-opacity-90 transform hover:scale-105 transition-all duration-200"
      >
        {cta}
      </button>
    </div>
  </div>
</div>

<!-- Features Grid -->
<div class="container mx-auto px-4 py-20">
  <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
    {#each features as feature}
      <div
        class="p-6 rounded-xl bg-white shadow-xl hover:shadow-2xl transition-shadow"
      >
        <div class="text-indigo-600 mb-4">
          <svg
            class="w-12 h-12"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d={feature.icon}
            />
          </svg>
        </div>
        <h3 class="text-xl font-bold mb-2">{feature.title}</h3>
        <p class="text-gray-600">{feature.description}</p>
      </div>
    {/each}
  </div>
</div>

<!-- Testimonials Section -->
<div class="bg-gray-50 py-20">
  <div class="container mx-auto px-4">
    <h2 class="text-3xl font-bold text-center mb-12">What Our Clients Say</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
      {#each testimonials as testimonial}
        <div
          class="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
        >
          <p class="text-gray-600 italic mb-4">"{testimonial.message}"</p>
          <div class="flex items-center">
            <div
              class="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold"
            >
              {testimonial.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div class="ml-4">
              <p class="font-bold">{testimonial.name}</p>
              <p class="text-gray-600 text-sm">{testimonial.jobtitle}</p>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>

<!-- CTA Section -->
<div class="container mx-auto px-4 py-20">
  <div class="bg-indigo-600 rounded-2xl p-12 text-center">
    <h2 class="text-3xl font-bold text-white mb-6">
      Ready to Transform Your Business?
    </h2>
    <p class="text-indigo-100 mb-8 max-w-2xl mx-auto">
      Join thousands of forward-thinking companies already leveraging our AI
      solutions.
    </p>
    <button
      class="bg-white text-indigo-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-opacity-90 transform hover:scale-105 transition-all duration-200"
    >
      Get Started Free
    </button>
  </div>
</div>

<style>
  @keyframes fade-in {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-fade-in {
    animation: fade-in 1s ease-out;
  }
</style>
