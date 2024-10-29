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

  let loading = false;
  const handleSubmit = async () => {
    try {
      loading = true;
      const response = await fetch("/api/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log(result);
      if (!result.key) {
        throw new Error("No key returned");
      }
      const url = `/?key=${result.key}`;
      console.log({ url });
      // The redirect function from @sveltejs/kit only works in server-side code
      // For client-side navigation, we need to use window.location
      window.location.href = url;
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      loading = false;
    }
  };
</script>

<svelte:head>
  <title>EnGaige - Setup - User Information</title>
</svelte:head>

<div class="container mx-auto p-4">
  <Card class="p-6">
    <h1 class="text-2xl font-bold mb-4">Proof-of-concept input form</h1>
    <p>
      To show you how we would customise our very own homepage with AI, enter
      some example details below!
    </p>
    <p class="text-sm text-gray-500">
      Coming soon - spreadsheet / external API connection!
    </p>
    <form on:submit|preventDefault={handleSubmit} class="space-y-4 mt-8">
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700">
          Name</label
        >
        <Input type="text" id="name" bind:value={formData.name} />
      </div>

      <div>
        <label for="relation" class="block text-sm font-medium text-gray-700">
          Relation / How you met</label
        >
        <Input
          type="text"
          id="relation"
          bind:value={formData.relation}
          required
        />
      </div>

      <div>
        <label for="company" class="block text-sm font-medium text-gray-700">
          Company Name</label
        >
        <Input
          type="text"
          id="company"
          bind:value={formData.company}
          required
        />
      </div>

      <div>
        <label for="jobTitle" class="block text-sm font-medium text-gray-700">
          Job Title
        </label>
        <Input
          type="text"
          id="jobTitle"
          bind:value={formData.jobTitle}
          required
        />
      </div>

      <div>
        <label for="otherInfo" class="block text-sm font-medium text-gray-700">
          Other Information, conversation notes etc.</label
        >

        <Textarea id="otherInfo" bind:value={formData.otherInfo} rows={3} />
      </div>

      <Button type="submit" class="" disabled={loading}>
        {loading ? "Loading..." : "Submit"}
      </Button>
    </form>
  </Card>
</div>
