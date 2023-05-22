import Link from "next/link";

import { PageLayout } from "@/components/layout";

export default function Page() {
  return (
    <PageLayout>
      
      <h1 className="text-4xl font-bold mb-2 py-12">Terms and Conditions of Better Agent Website</h1>

      <p className="max-w-screen-desktop text-justify">
      Please read these terms and conditions carefully before using our Better Agent website. By accessing or using our website, you agree to be bound by these terms and conditions. If you do not agree with any part of these terms and conditions, please refrain from using our website.
      </p>
      
      <h2 className="text-2xl font-bold mb-2 py-6">Acceptance of Terms</h2>
      <p className="max-w-screen-desktop text-justify">
      1.1 By accessing or using Better Agent  (hereinafter referred to as "the Website"), you acknowledge that you have read, understood, and agreed to be bound by these terms and conditions, and any additional guidelines, rules, or policies referenced herein.

      1.2 These terms and conditions may be updated or modified by us at any time without prior notice. Your continued use of the Website after any such changes constitutes your acceptance of the revised terms and conditions.
      </p>

      <h2 className="text-2xl font-bold mb-2 py-6">User Obligations</h2>
      <p className="max-w-screen-desktop text-justify">
      2.1 The Website is intended for individuals who are at least 18 years old. By using the Website, you affirm that you are 18 years of age or older.

      2.2 You agree to use the Website only for lawful purposes and in compliance with all applicable laws and regulations. You shall not engage in any activity that may disrupt or interfere with the proper functioning of the Website.

      2.3 You are solely responsible for the accuracy, completeness, and legality of any information or content you submit to the Website.

      2.4 You shall not impersonate any other person or entity or misrepresent your affiliation with any person or entity while using the Website.
      </p>

      <h2 className="text-2xl font-bold mb-2 py-6">Property Agent Reviews</h2>
      <p className="max-w-screen-desktop text-justify">
      3.1 The Website provides a platform for users to submit reviews and ratings of property agents in Singapore.

      3.2 By submitting a review, you represent and warrant that your review is truthful, accurate, and based on your personal experience with the property agent being reviewed.

      3.3 You agree to refrain from submitting any defamatory, fraudulent, or misleading reviews or content that violates any third-party rights, including intellectual property rights.

      3.4 We reserve the right to remove or modify any review or content submitted to the Website at our discretion, without providing any explanation or notification.
      </p>

      <h2 className="text-2xl font-bold mb-2 py-6">Intellectual Property Rights</h2>
      <p className="max-w-screen-desktop text-justify">
      4.1 All intellectual property rights, including but not limited to trademarks, logos, and content on the Website, are owned by us or our licensors. You agree not to use, reproduce, distribute, or modify any intellectual property without our prior written consent.
      </p>

      <h2 className="text-2xl font-bold mb-2 py-6">Limitation of Liability</h2>
      <p className="max-w-screen-desktop text-justify">
      5.1 The Website and its content are provided on an "as-is" basis without any warranties or representations, either express or implied. We do not guarantee the accuracy, completeness, or reliability of any information or content on the Website.

      5.2 In no event shall we be liable for any indirect, consequential, incidental, punitive, or special damages arising out of or in connection with your use of the Website, including but not limited to lost profits, loss of data, or loss of reputation.
      </p>

      <h2 className="text-2xl font-bold mb-2 py-6">Indemnification</h2>
      <p className="max-w-screen-desktop text-justify">
      6.1 You agree to indemnify and hold us harmless from any claims, losses, liabilities, damages, expenses, or costs (including reasonable attorneys' fees) arising out of or in connection with your use of the Website, violation of these terms and conditions, or infringement of any third-party rights.
      </p>

      <h2 className="text-2xl font-bold mb-2 py-6">Termination</h2>
      <p className="max-w-screen-desktop text-justify">
      7.1 We reserve the right to terminate or suspend your access to the Website at any time without prior notice or liability, for any reason, including but not limited to your violation of these terms and conditions.
      </p>

      <h2 className="text-2xl font-bold mb-2 py-6">Governing Law</h2>
      <p className="max-w-screen-desktop text-justify">
      8.1 These terms and conditions shall be governed by and construed in accordance with the laws of Singapore. Any dispute arising out of or in connection with these terms and conditions shall be subject to the exclusive jurisdiction of the courts of Singapore.
      </p>

      <h2 className="text-2xl font-bold mb-2 py-6">Severability</h2>
      <p className="max-w-screen-desktop text-justify">
      9.1 If any provision of these terms and conditions is found to be invalid, illegal, or unenforceable, the remaining provisions shall continue in full force and effect.

      By using our property agent review website, you acknowledge that you have read, understood, and agreed to these terms and conditions.
      </p>

      <h2 className="text-2xl font-bold mb-2 py-6">Data source</h2>
      <p className="max-w-screen-desktop text-justify">
        Contains information from{" "}
        <Link
          href="https://data.gov.sg/dataset/cea-salesperson-info"
          className="text-teal-400 font-semibold"
        >
          CEA Salesperson Information
        </Link>{" "}
        and{" "}
        <Link
          href="https://data.gov.sg/dataset/cea-salesperson-residential-transaction-record"
          className="text-teal-400 font-semibold"
        >
          CEA Salespersons’ Property Transaction Records (residential)
        </Link>{" "}
        accessed on 2023-04-24, which is made available under the{" "}
        <Link
          href="https://data.gov.sg/open-data-licence"
          className="text-teal-400 font-semibold"
        >
          terms
        </Link>{" "}
        of the Singapore Open Data Licence version 1.0
      </p>
    </PageLayout>
  );
}
