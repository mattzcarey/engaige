<script lang="ts">
  import { Button } from "$lib/ui/button";
  import { Card } from "$lib/ui/card";
  import { Input } from "$lib/ui/input";
  import { Textarea } from "$lib/ui/textarea";

  type FormData = {
    name: string;
    age: number;
    jobTitle: string;
    personalInfo: string;
    wants: string;
    needs: string;
    desires: string;
  };

  let formData: FormData = {
    name: "",
    age: 0,
    jobTitle: "",
    personalInfo: "",
    wants: "",
    needs: "",
    desires: "",
  };

  const handleSubmit = (): void => {
    console.log("Form submitted:", formData);
    // Here you would typically send the data to a server or perform other actions
  };
</script>

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
        <label for="age" class="block text-sm font-medium text-gray-700"
          >Age</label
        >
        <Input type="number" id="age" bind:value={formData.age} required />
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
        <label
          for="personalInfo"
          class="block text-sm font-medium text-gray-700">Personal Info</label
        >
        <Textarea
          id="personalInfo"
          bind:value={formData.personalInfo}
          rows="3"
        />
      </div>

      <div>
        <label for="wants" class="block text-sm font-medium text-gray-700"
          >Wants</label
        >
        <Textarea id="wants" bind:value={formData.wants} rows="2" />
      </div>

      <div>
        <label for="needs" class="block text-sm font-medium text-gray-700"
          >Needs</label
        >
        <Textarea id="needs" bind:value={formData.needs} rows="2" />
      </div>

      <div>
        <label for="desires" class="block text-sm font-medium text-gray-700"
          >Desires</label
        >
        <Textarea id="desires" bind:value={formData.desires} rows="2" />
      </div>

      <Button type="submit" class="w-full">Submit</Button>
    </form>
  </Card>
</div>
