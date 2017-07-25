//
//  ApiAi.swift
//  reactNativeApiAi
//
//  Created by admin on 25.07.17.
//  Copyright © 2017 Facebook. All rights reserved.
//

import Foundation
import UIKit

@objc(ApiAi)
class ApiAi: NSObject {
  
  @objc func startListening() {
    let alert = UIAlertView(title: "alert", message: "startListening", delegate:self, cancelButtonTitle: "OK")
    alert.show();
  }
}
