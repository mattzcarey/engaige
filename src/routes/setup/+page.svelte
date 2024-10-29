<script lang="ts">
  import { Button } from "$lib/ui/button";
  import { Card } from "$lib/ui/card";
  import { Input } from "$lib/ui/input";
  import { Textarea } from "$lib/ui/textarea";

  type FormData = {
    name: string;
    relation: string;
    company: string;
    jobTitle: string;
    otherInfo: string;
  };

  let formData: FormData = {
    name: "",
    relation: "",
    company: "",
    jobTitle: "",
    otherInfo: "",
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log(result.message);
      const url = `/?key=${result.key}`;
      console.log({ url });
      // The redirect function from @sveltejs/kit only works in server-side code
      // For client-side navigation, we need to use window.location
      window.location.href = url;
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
</script>

<svelte:head>
  <title>EnGaige - Setup - User Information</title>
</svelte:head>

<div class="container mx-auto p-4">
  <Card class="p-6">
    <h1 class="text-2xl font-bold mb-4">User Information Form</h1>
    <form on:submit|preventDefault={handleSubmit} class="space-y-4">
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700"
          >Name</label
        >
        <Input type="text" id="name" bind:value={formData.name} required />
      </div>

      <div>
        <label for="relation" class="block text-sm font-medium text-gray-700"
          >Relation</label
        >
        <Input
          type="text"
          id="relation"
          bind:value={formData.relation}
          required
        />
      </div>

      <div>
        <label for="company" class="block text-sm font-medium text-gray-700"
          >Company</label
        >
        <Input
          type="text"
          id="company"
          bind:value={formData.company}
          required
        />
      </div>

      <div>
        <label for="jobTitle" class="block text-sm font-medium text-gray-700"
          >Job Title</label
        >
        <Input
          type="text"
          id="jobTitle"
          bind:value={formData.jobTitle}
          required
        />
      </div>

      <div>
        <label for="otherInfo" class="block text-sm font-medium text-gray-700"
          >Other Information</label
        >
        <Textarea id="otherInfo" bind:value={formData.otherInfo} rows={3} />
      </div>

      <Button type="submit" class="w-full">Submit</Button>
    </form>
  </Card>
</div>
