## How to get your Meta Pixel ID (META_PIXEL_ID)

You’ll find your **Meta Pixel ID** inside Meta Business (Events Manager). It’s a **numeric** ID (looks like `123456789012345`).

### Step-by-step (Meta Events Manager)

1. Open Meta Events Manager:
   - Go to `https://business.facebook.com/events_manager2`

2. Select the correct Business (if you have multiple):
   - Use the Business dropdown (top-left) and pick the Business that owns HomelyB.

3. Find (or create) your Pixel:
   - In the left sidebar, choose **Data sources** → **Pixels**
   - Click your Pixel (or create one if you don’t have it yet)

4. Copy the Pixel ID:
   - On the Pixel’s overview page, you’ll see **Pixel ID** (a number)
   - Copy it

### Common places the Pixel ID appears

- **Pixel Overview / Details**: “Pixel ID: 123…”
- **Add Events / Install instructions**: it may show in the setup modal

### Paste it into this project

1. Open `meta_pixel_id.txt`
2. Replace `PASTE_YOUR_META_PIXEL_ID_HERE` with your numeric Pixel ID
3. Deploy again (or redeploy)

### Quick validation

- Your Pixel ID should be **digits only** (no spaces, no letters)
- After deployment, visit `https://homelyb.com/availability/`
- In Events Manager, you should start seeing **PageView** events (may take a few minutes).

