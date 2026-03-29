import SwiftUI

@Observable
class CameraViewModel {
    var capturedImage: UIImage?
    var showingImagePicker = false
    var showingCamera = false
    var showingResults = false

    let classifierService = FoodClassifierService()

    // Selected result for saving
    var selectedResult: ClassificationResult?
    var editedCalories: Int = 0
    var editedName: String = ""
    var editedProtein: Double = 0
    var editedCarbs: Double = 0
    var editedFat: Double = 0
    var editedServingSize: String = "1 serving"

    func analyzeImage() {
        guard let image = capturedImage else { return }
        classifierService.classifyImage(image)
        showingResults = true
    }

    func selectResult(_ result: ClassificationResult) {
        selectedResult = result
        editedName = result.foodName
        editedCalories = result.nutrition?.caloriesPerServing ?? 0
        editedProtein = result.nutrition?.proteinGrams ?? 0
        editedCarbs = result.nutrition?.carbsGrams ?? 0
        editedFat = result.nutrition?.fatGrams ?? 0
        editedServingSize = result.nutrition?.servingSize ?? "1 serving"
    }

    func reset() {
        capturedImage = nil
        showingResults = false
        selectedResult = nil
        classifierService.results = []
    }

    var compressedImageData: Data? {
        capturedImage?.jpegData(compressionQuality: 0.5)
    }
}
